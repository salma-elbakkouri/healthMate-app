import { auth, firestore } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';
import { doc, setDoc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, push, set } from 'firebase/database';
import { scheduleNotification } from '../components/notifsetup';
import moment from 'moment-timezone';
// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    Alert.alert('Login Error', error.message);
    return null;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout Error', error);
  }
};

// Send password reset email
export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert('Password Reset Email Sent', 'Check your email to reset your password.');
  } catch (error) {
    Alert.alert('Password Reset Error', error.message);
  }
};

export const registerUser = async (fullName, email, password, imageIndex = 0) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Add user to Firestore with full name and image index
    await setDoc(doc(firestore, 'users', userCredential.user.uid), {
      fullName: fullName,
      email: email,
      imageIndex: imageIndex, // Use 'imageIndex' without spaces and as a number
    });

    // Save full name, email, and image index in AsyncStorage
    await AsyncStorage.setItem('userFullName', fullName);
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userImageIndex', imageIndex.toString()); // Store as string in AsyncStorage

    console.log('User full name, email, and image index saved in AsyncStorage');

    return userCredential.user;
  } catch (error) {
    Alert.alert('Registration Error', error.message);
    console.error('Registration Error:', error);
    return null;
  }
};

const calculateTimeUntil = (timeString) => {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === 'AM' && hours === '12') {
    hours = 0;
  }
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(hours, minutes, 0);

  if (targetTime < now) {
    targetTime.setDate(now.getDate() + 1);
  }

  return (targetTime - now) / 1000; // seconds until the target time
};

export const fetchUserNotifications = async (userId) => {
  try {
    const notificationsQuery = query(
      collection(firestore, 'notifications'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(notificationsQuery);
    const notifications = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw new Error('Failed to fetch notifications');
  }
};

export const saveNotification = async (userId, pillName, dose, time) => {
  try {
    const notificationTime = moment(time, 'h:mm A').tz('Africa/Casablanca').toISOString();
    const notification = {
      userId,
      title: `${pillName}`,
      body: `${dose} at ${time}.`,
      pillName,
      dose,
      time,
      timestamp: notificationTime, // Use the notification time for the timestamp
    };

    await setDoc(doc(collection(firestore, 'notifications')), notification);

    console.log('Notification saved successfully');
  } catch (error) {
    console.error('Error saving notification:', error);
    throw new Error('Failed to save notification');
  }
};

export const saveMedicineReminder = async (userId, pillName, amount, frequency, beginDate, endDate, doses, notificationEnabled) => {
  try {
    const data = {
      userId: userId,
      pillName: pillName,
      amount: amount,
      frequency: frequency,
      beginDate: beginDate.toISOString(),
      endDate: endDate.toISOString(),
      notificationEnabled: notificationEnabled,
    };

    // Add doses based on the frequency
    const times = parseInt(frequency.split(' ')[0], 10);
    if (times >= 1) data.firstDose = doses.firstDose;
    if (times >= 2) data.secondDose = doses.secondDose;
    if (times >= 3) data.thirdDose = doses.thirdDose;

    await setDoc(doc(collection(firestore, 'medicineReminders')), data);

    // Save notifications if enabled
    if (notificationEnabled) {
      const dosesArray = Object.keys(doses).map(key => doses[key]);
      for (let i = 0; i < dosesArray.length; i++) {
        const doseTime = dosesArray[i];
        if (doseTime) {
          const secondsUntilDose = calculateTimeUntil(doseTime);
          await saveNotification(userId, pillName, `dose ${i + 1}`, doseTime);
          await scheduleNotification(`Time to take your medicine: ${pillName}`, `It's time to take your dose ${i + 1} of ${pillName} at ${doseTime}.`, secondsUntilDose, userId, pillName);
        }
      }
    }

    console.log('Medicine reminder saved successfully');
  } catch (error) {
    console.error('Error saving medicine reminder:', error);
    throw new Error('Failed to save medicine reminder');
  }
};

export const fetchMedicineReminders = async (userId) => {
  try {
    const q = query(collection(firestore, 'medicineReminders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const medicines = [];
    querySnapshot.forEach((doc) => {
      medicines.push({ id: doc.id, ...doc.data() });
    });
    return medicines;
  } catch (error) {
    console.error('Error fetching medicine reminders:', error);
    return [];
  }
};






export const deleteMedicineReminder = async (docId) => {
  try {
    await deleteDoc(doc(firestore, 'medicineReminders', docId));
    Alert.alert('Success', 'Medicine reminder deleted successfully.');
  } catch (error) {
    console.error('Error deleting medicine reminder:', error);
    Alert.alert('Error', 'Failed to delete medicine reminder. Please try again.');
  }
};


// Other imports and functions

export const fetchMedicineReminderById = async (reminderId) => {
  if (!reminderId) {
    console.error('Reminder ID is undefined or null');
    return null;
  }
  try {
    const reminderDoc = await getDoc(doc(firestore, 'medicines', reminderId));
    if (reminderDoc.exists()) {
      return { id: reminderDoc.id, ...reminderDoc.data() };
    } else {
      console.log('No such reminder!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching medicine reminder:', error);
    return null;
  }
};

// Ensure this function is exported properly



// Update a specific medicine reminder
export const updateMedicineReminder = async (reminderId, userId, pillName, amount, frequency, beginDate, endDate, doses, notificationEnabled) => {
  try {
    // Fetch existing notifications related to this reminder
    const notificationsQuery = query(
      collection(firestore, 'notifications'),
      where('userId', '==', userId),
      where('pillName', '==', pillName)
    );
    const notificationsSnapshot = await getDocs(notificationsQuery);

    // Delete existing notifications
    const deletePromises = notificationsSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Prepare updated reminder data
    const data = {
      userId: userId,
      pillName: pillName,
      amount: amount,
      frequency: frequency,
      beginDate: beginDate.toISOString(),
      endDate: endDate.toISOString(),
      notificationEnabled: notificationEnabled
    };

    // Add doses based on the frequency
    const times = parseInt(frequency.split(' ')[0], 10);
    if (times >= 1) data.firstDose = doses.firstDose;
    if (times >= 2) data.secondDose = doses.secondDose;
    if (times >= 3) data.thirdDose = doses.thirdDose;

    // Update the reminder in Firestore
    await updateDoc(doc(firestore, 'medicineReminders', reminderId), data);

    // Save notifications if enabled
    if (notificationEnabled) {
      const dosesArray = Object.keys(doses).map(key => doses[key]);
      for (let i = 0; i < dosesArray.length; i++) {
        const doseTime = dosesArray[i];
        if (doseTime) {
          const secondsUntilDose = calculateTimeUntil(doseTime);
          await saveNotification(userId, pillName, `dose ${i + 1}`, doseTime);
          await scheduleNotification(`Time to take your medicine: ${pillName}`, `It's time to take your dose ${i + 1} of ${pillName} at ${doseTime}.`, secondsUntilDose, userId, pillName);
        }
      }
    }

    console.log('Medicine reminder updated successfully');
    Alert.alert('Success', 'Medicine reminder updated successfully.');
  } catch (error) {
    console.error('Error updating medicine reminder:', error);
    Alert.alert('Error', 'Failed to update medicine reminder. Please try again.');
  }
};