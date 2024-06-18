// authFunctions.js

import { auth, firestore } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';
import { doc, setDoc, getDocs, collection, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



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



export const saveMedicineReminder = async (userId, pillName, amount, frequency, beginDate, endDate, doses, notificationEnabled) => {
  try {
    await setDoc(doc(firestore, 'medicines', `${userId}_${pillName}`), {
      userId: userId,
      pillName: pillName,
      amount: amount,
      frequency: frequency,
      beginDate: beginDate.toISOString(), // Convert to ISO string
      endDate: endDate.toISOString(), // Convert to ISO string
      firstDose: doses.firstDose,
      secondDose: doses.secondDose,
      thirdDose: doses.thirdDose,
      notificationEnabled: notificationEnabled
    });

    console.log('Medicine reminder saved successfully');
    Alert.alert('Success', 'Medicine reminder saved successfully.');
  } catch (error) {
    console.error('Error saving medicine reminder:', error);
    Alert.alert('Error', 'Failed to save medicine reminder. Please try again.');
  }
};


export const fetchMedicineReminders = async (userId) => {
  try {
    const q = query(collection(firestore, 'medicines'), where('userId', '==', userId));
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
    await deleteDoc(doc(firestore, 'medicines', docId));
    Alert.alert('Success', 'Medicine reminder deleted successfully.');
  } catch (error) {
    console.error('Error deleting medicine reminder:', error);
    Alert.alert('Error', 'Failed to delete medicine reminder. Please try again.');
  }
};

// Update medicine reminder
export const updateMedicineReminder = async (docId, updatedData) => {
  try {
    await updateDoc(doc(firestore, 'medicines', docId), updatedData);
    Alert.alert('Success', 'Medicine reminder updated successfully.');
  } catch (error) {
    console.error('Error updating medicine reminder:', error);
    Alert.alert('Error', 'Failed to update medicine reminder. Please try again.');
  }
};  