import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage
import { firestore, auth } from '../config/firebaseConfig'; // Firebase configuration
import { doc, updateDoc } from "firebase/firestore";

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true); // State to manage Firebase initialization

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userFullName = await AsyncStorage.getItem('userFullName');
      const userEmail = await AsyncStorage.getItem('userEmail');
      if (userFullName && userEmail) {
        setFullName(userFullName);
        setEmail(userEmail);
      } else {
        console.log('User data not found in AsyncStorage, fetching from Firestore...');
        console.log('Auth user:', auth.currentUser); // Check if current user is authenticated

        // Fetch user data from Firestore
        const userDoc = await firestore.collection('users').doc(auth.currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setFullName(userData.fullName);
          setEmail(userData.email);
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
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not authenticated.');
      }

      // Update user data in Firestore
      await updateDoc(doc(firestore, 'users', currentUser.uid), {
        fullName: fullName,
      });

      // Update AsyncStorage if needed
      await AsyncStorage.setItem('userFullName', fullName);

      // Display success message
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
      navigation.navigate('Profile');

    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Update Error', 'Failed to update profile. Please try again later.');
    }


    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated.');
        }
  
        // Reauthenticate user with current password
        const credential = await auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
        await currentUser.reauthenticateWithCredential(credential);
  
        // Change user password
        await currentUser.updatePassword(newPassword);
  
        // Display success message
        Alert.alert('Password Updated', 'Your password has been updated successfully.');
        setNewPassword('');
        setCurrentPassword('');
  
      } catch (error) {
        console.error('Error updating password:', error);
        Alert.alert('Password Update Error', 'Failed to update password. Please check your current password and try again.');
      }
  };

  

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top White Header */}
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Doctor Image */}
      <View style={styles.doctorImageContainer}>
        <Image source={require('../assets/doctor.png')} style={styles.doctorImage} />
      </View>

      {/* Edit Avatar Button */}
      <TouchableOpacity style={styles.editAvatarButton}>
        <Text style={styles.editAvatarButtonText}>Edit Avatar</Text>
      </TouchableOpacity>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>User infos</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#B9C6D3"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email Input (Disabled) */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#B9C6D3"
          value={email}
          editable={false} // Make the email input disabled
        />
      </View>

      {/* Current Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your current password"
          placeholderTextColor="#B9C6D3"
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>

      {/* New Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your new password"
          placeholderTextColor="#B9C6D3"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },
  whiteHeader: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginLeft: 20,
  },
  doctorImageContainer: {
    marginTop: 20,
  },
  doctorImage: {
    width: 120,
    height: 115,
    borderRadius: 70,
  },
  editAvatarButton: {
    borderWidth: 1,
    borderColor: '#1E3C42',
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginTop: 20,
    borderRadius: 3,
  },
  editAvatarButtonText: {
    color: '#1E3C42',
    fontSize: 14,
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  label: {
    color: '#1E3C42',
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B9C6D3',
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 14,
  },
  updateButton: {
    backgroundColor: '#4E869D',
    marginTop: 20,
    width: '80%',
    paddingVertical: 13,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EditProfile;
