import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 for the pen icon
import { logoutUser } from '../config/authFunctions'; // Import logout function from authFunctions
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage to fetch user data
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for creating gradients

const Profile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

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
        console.log('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: handleLogout,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout function
      navigation.navigate('Login'); // Navigate to Login or wherever appropriate
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      {/* Profile Header with Gradient Background */}
      <LinearGradient
        colors={['#4E869D', '#C6E3E1']} // Gradient colors from 4E869D to C6E3E1
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHeader}
      >
        <View style={styles.profileImageContainer}>
          <Image source={require('../assets/doctor.png')} style={styles.profileImage} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </LinearGradient>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToEditProfile}>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={confirmLogout}>
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal:20,
    borderRadius:20,
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 8,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
  },
  fullName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: 'white',
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 2,
  },
  menuText: {
    color: '#1E3C42',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutText: {
    color: 'red',
  },
});

export default Profile;
