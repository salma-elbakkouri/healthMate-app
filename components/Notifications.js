import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { fetchUserNotifications } from '../config/authFunctions'; // Import the fetch function
import { getAuth } from 'firebase/auth';
import BottomMenu from './BottomMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment-timezone';
import { useFocusEffect } from '@react-navigation/native';

// Import the single notification image statically
const notificationIcon = require('../assets/pill.png');

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const fetchedNotifications = await fetchUserNotifications(userId);

      // Get the current time in Casablanca timezone (GMT+1)
      const currentTime = moment().tz('Africa/Casablanca').valueOf();
      console.log('Current Time:', moment(currentTime).tz('Africa/Casablanca').format('LLLL'));

      const sentNotifications = fetchedNotifications.filter(notification => {
        const notificationTime = moment(notification.timestamp).tz('Africa/Casablanca').valueOf();
        console.log('Notification Time:', moment(notificationTime).tz('Africa/Casablanca').format('LLLL'), 'Title:', notification.title);
        return notificationTime <= currentTime;
      });

      setNotifications(sentNotifications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3C42" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={notificationIcon} style={styles.notificationIcon} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationBody}>{item.body}</Text>
        <Text style={styles.notificationDate}>{moment(item.timestamp).tz('Africa/Casablanca').format('LLLL')}</Text>
      </View>
    </View>
  );

  const renderFooter = () => <View style={styles.listFooter} />;

  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      {notifications.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.text}>No notifications found!</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={renderFooter}
        />
      )}
      <BottomMenu activeScreen="Notifications" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  whiteHeader: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginLeft: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#31477A',
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60, 
    backgroundColor: '#F7F7F7',
  },
  listFooter: {
    height: 20, // Adjust this height to provide enough margin
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 50,
    height: 40,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#31477A',
  },
  notificationBody: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Notifications;
