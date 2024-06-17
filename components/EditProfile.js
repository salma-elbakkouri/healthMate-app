import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { firestore, auth } from '../config/firebaseConfig';

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([require('../assets/avatarboy.jpg'), require('../assets/avatargirl.png')]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Initialize with default image index
  const [imageIndex, setImageIndex] = useState(0); // This will hold the fetched image index

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userFullName = await AsyncStorage.getItem('userFullName');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userImageIndex = await AsyncStorage.getItem('userImageIndex');
      console.log('UserFullName from AsyncStorage:', userFullName);
      console.log('UserEmail from AsyncStorage:', userEmail);
      console.log('UserImageIndex from AsyncStorage:', userImageIndex);

      if (userFullName && userEmail && userImageIndex !== null) {
        setFullName(userFullName);
        setEmail(userEmail);
        const parsedImageIndex = parseInt(userImageIndex, 10);
        setImageIndex(parsedImageIndex);
        setCurrentImageIndex(parsedImageIndex);
      } else {
        console.log('User data not found in AsyncStorage, fetching from Firestore...');
        console.log('Auth user:', auth.currentUser);

        const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User Data from Firestore:', userData);
          setFullName(userData.fullName);
          setEmail(userData.email);
          const fetchedImageIndex = userData.imageIndex || 0; // Use fetched index or default to 0
          setImageIndex(fetchedImageIndex);
          setCurrentImageIndex(fetchedImageIndex); // Set the image index based on the fetched data
        } else {
          console.log('No such document!');
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!currentPassword && !newPassword && !confirmNewPassword) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated.');
        }

        await updateDoc(doc(firestore, 'users', currentUser.uid), {
          fullName: fullName,
          imageIndex: imageIndex, // Update imageIndex in Firestore
        });

        await AsyncStorage.setItem('userFullName', fullName);
        await AsyncStorage.setItem('userImageIndex', imageIndex.toString()); // Update image index in AsyncStorage

        Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
        navigation.navigate('Profile');
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Update Error', 'Failed to update profile. Please try again later.');
      }
    } else {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        Alert.alert('Incomplete Password Fields', 'Please fill in all password fields.');
        return;
      }

      if (newPassword !== confirmNewPassword) {
        Alert.alert('Password Mismatch', 'New password and confirm password do not match.');
        return;
      }

      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated.');
        }

        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);

        await updatePassword(currentUser, newPassword);

        await updateDoc(doc(firestore, 'users', currentUser.uid), {
          fullName: fullName,
          imageIndex: imageIndex, // Update imageIndex in Firestore
        });

        await AsyncStorage.setItem('userFullName', fullName);
        await AsyncStorage.setItem('userImageIndex', imageIndex.toString()); // Update image index in AsyncStorage

        Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
        setNewPassword('');
        setCurrentPassword('');
        setConfirmNewPassword('');
        navigation.navigate('Profile');
      } catch (error) {
        console.error('Error updating password:', error);
        Alert.alert('Password Update Error', 'Failed to update password. Please check your current password and try again.');
      }
    }
  };

  const toggleImage = () => {
    const newImageIndex = currentImageIndex === 0 ? 1 : 0;
    setCurrentImageIndex(newImageIndex);
    setImageIndex(newImageIndex); // Update imageIndex based on the toggle
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={images[currentImageIndex]} style={styles.profileImage} />
          </View>
          <TouchableOpacity style={styles.chevronLeft} onPress={toggleImage}>
            <Entypo name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chevronRight} onPress={toggleImage}>
            <Entypo name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formGroup}>
            <View style={styles.infoLabel}>
              <FontAwesome5 name="user" size={12} color="#9FA3B5" />
              <Text style={styles.label}>Full Name</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.infoLabel}>
              <FontAwesome5 name="envelope" size={12} color="#9FA3B5" />
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your email address"
              value={email}
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.infoLabel}>
              <FontAwesome5 name="lock" size={12} color="#9FA3B5" />
              <Text style={styles.label}>Current Password</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.infoLabel}>
              <FontAwesome5 name="lock" size={12} color="#9FA3B5" />
              <Text style={styles.label}>New Password</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.infoLabel}>
              <FontAwesome5 name="lock" size={12} color="#9FA3B5" />
              <Text style={styles.label}>Confirm New Password</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  profileHeader: {
    backgroundColor: '#1E3C42',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 30,
    marginBottom: 10,
    position: 'relative',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E9EA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chevronLeft: {
    position: 'absolute',
    top: '100%',
    left: 10,
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  chevronRight: {
    position: 'absolute',
    top: '100%',
    right: 10,
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 17,
  },
  username: {
    color: '#9FA3B5',
    fontSize: 12,
    marginTop: 5,
  },
  fullName: {
    color: '#1E3C42',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 2,
  },
  joinDate: {
    color: '#9FA3B5',
    fontSize: 10,
  },
  contentContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    color: '#9FA3B5',
    fontSize: 12,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    height: 45,
    backgroundColor: '#FFFFFF',
  },
  updateButton: {
    backgroundColor: '#1E3C42',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
