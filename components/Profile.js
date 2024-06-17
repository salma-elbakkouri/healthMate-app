import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { logoutUser } from '../config/authFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { firestore, auth } from '../config/firebaseConfig';

const Profile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(require('../assets/avatarboy.jpg')); // Set initial image to boy for a default

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      const userFullName = await AsyncStorage.getItem('userFullName');
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userImageIndex = await AsyncStorage.getItem('userImageIndex');

      if (userFullName && userEmail && userImageIndex !== null) {
        setFullName(userFullName);
        setEmail(userEmail);
        updateProfileImage(userImageIndex);

        console.log('Data retrieved from AsyncStorage:');
        console.log('FullName:', userFullName);
        console.log('Email:', userEmail);
        console.log('ImageIndex:', userImageIndex);
      } else {
        console.log('User data not found in AsyncStorage, fetching from Firestore...');
        
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = await firestore.collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setFullName(userData.fullName);
            setEmail(userData.email);
            const fetchedImageIndex = userData.imageIndex; // Directly use fetched image index
            updateProfileImage(fetchedImageIndex);

            console.log('Data retrieved from Firestore:');
            console.log('FullName:', userData.fullName);
            console.log('Email:', userData.email);
            console.log('ImageIndex:', userData.imageIndex);
          } else {
            console.log('No such document in Firestore!');
          }
        } else {
          console.log('No authenticated user.');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateProfileImage = (index) => {
    // Check index and set the appropriate image
    if (index === '1') {
      setProfileImage(require('../assets/avatargirl.png'));
    } else {
      setProfileImage(require('../assets/avatarboy.jpg'));
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
      await logoutUser();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
        </View>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.username}>@{fullName}</Text>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.joinDate}>Joined 17 June 2024</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="envelope" size={14} color="#9FA3B5" />
            <Text style={styles.infoText}>Email</Text>
          </View>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="user" size={14} color="#9FA3B5" />
            <Text style={styles.infoText}>Full name</Text>
          </View>
          <Text style={styles.infoValue}>{fullName}</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="lock" size={13} color="#9FA3B5" />
            <Text style={styles.infoText}>Password</Text>
          </View>
          <Text style={styles.infoValue}>********</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="calendar" size={14} color="#9FA3B5" />
            <Text style={styles.infoText}>Joined</Text>
          </View>
          <Text style={styles.infoValue}>17 June 2024</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.infoItem} onPress={navigateToEditProfile}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="pen" size={14} color="#9FA3B5" />
            <Text style={styles.infoText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="sun" size={14} color="#9FA3B5" />
            <Text style={styles.infoText}>Theme</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="question-circle" size={14} color="#9FA3B5" />
            <Text style={styles.infoText}>About Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.infoItem, styles.logoutItem]} onPress={confirmLogout}>
          <View style={styles.infoLabel}>
            <FontAwesome5 name="sign-out-alt" size={14} color="#E57676" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  },
  profileHeader: {
  backgroundColor: '#1E3C42',
  alignItems: 'center',
  paddingVertical: 80,
  marginBottom: 10,
  position: 'relative',
  },
  profileImageContainer: {
  position: 'absolute',
  top: 100,
  width: 120,
  height: 120,
  borderRadius: 70,
  overflow: 'hidden',
  borderWidth: 0.6,
  borderColor: '#E8E9EA',
  justifyContent: 'center',
  alignItems: 'center',
  },
  profileImage: {
  width: '100%',
  height: '100%',
  zIndex: 1,
  },
  profileInfo: {
  alignItems: 'center',
  marginTop: 60,
  marginBottom: 20,
  },
  username: {
  color: '#9FA3B5',
  fontSize: 11,
  marginTop: 10,
  },
  fullName: {
  color: '#1E3C42',
  fontSize: 14,
  fontWeight: 'bold',
  marginTop: 4,
  marginBottom: 4,
  },
  joinDate: {
  color: '#9FA3B5',
  fontSize: 10,
  },
  section: {
  paddingHorizontal: 20,
  marginBottom: 20,
  },
  sectionTitle: {
  color: '#1E3C42',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  },
  infoItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 15,
  borderBottomWidth: 0.5,
  borderBottomColor: '#E8E9EA',
  },
  infoLabel: {
  flexDirection: 'row',
  alignItems: 'center',
  },
  infoText: {
  color: '#9FA3B5',
  fontSize: 12,
  marginLeft: 15,
  },
  infoValue: {
  color: '#333333',
  fontSize: 12,
  },
  logoutItem: {
  borderBottomWidth: 0,
  },
  logoutText: {
  color: '#E57676',
  fontSize: 12,
  marginLeft: 15,
  },
  });
export default Profile;
