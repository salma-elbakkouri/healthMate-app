import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore, auth } from '../config/firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(require('../assets/doctor.png'));

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
        console.log('Auth user:', auth.currentUser);
  
        const userDoc = await firestore.collection('users').doc(auth.currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setFullName(userData.fullName);
          setEmail(userData.email);
          // Check if profileImage exists and set the image state accordingly
          if (userData.profileImage) {
            setImage({ uri: userData.profileImage });
          } else {
            // Set a default image if profileImage is null
            setImage(require('../assets/doctor.png')); // Replace with your default image path
          }
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
      // If password fields are empty, update only the full name
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('User not authenticated.');
        }

        await updateDoc(doc(firestore, 'users', currentUser.uid), {
          fullName: fullName,
        });

        await AsyncStorage.setItem('userFullName', fullName);

        Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
        navigation.navigate('Profile');

      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Update Error', 'Failed to update profile. Please try again later.');
      }
    } else {
      // If current password is filled, validate and update the password
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
        });

        await AsyncStorage.setItem('userFullName', fullName);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.uri });
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
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.doctorImageContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={image} style={styles.doctorImage} />
          <View style={styles.cameraIconContainer}>
            <Entypo name="camera" size={24} color="#4E869D" />
          </View>
        </TouchableOpacity>
      </View>

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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#B9C6D3"
          value={email}
          editable={false}
        />
      </View>

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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm your new password"
          placeholderTextColor="#B9C6D3"
          secureTextEntry={true}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
      </View>

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
    position: 'relative',
  },
  doctorImage: {
    width: 120,
    height: 115,
    borderRadius: 70,
  },
  cameraIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 8,
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
