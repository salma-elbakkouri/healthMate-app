// authFunctions.js

import { auth, firestore } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
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