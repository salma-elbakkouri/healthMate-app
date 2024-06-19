import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Articles from './components/Articles';
import Chat from './components/Chat';
import Reminder from './components/Reminder';
import Notifications from './components/Notifications';
import ArticleDetail from './components/ArticleDetail';
import Tips from './components/Tips';
import TipDetail from './components/TipDetail';
import Welcome from './components/welcome';
import Stats from './components/Stats';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Records from './components/Records';
import NewMedicineReminder from './components/NewMedicineReminder';
import UpdateMedicineReminder from './components/UpdateMedicineReminder ';

import { useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

const App = () => {
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging.getToken().then(token => {
  //       console.log(token);
  //     });
  //   }
  //   else {
  //     console.log('Failed to get token status:', authStatus);
  //   }

  //   messaging().getInitialNotifications().then(async (remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from quit state ',
  //         remoteMessage.notification,
  //       );
  //     }
  //   });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state ',
  //       remoteMessage.notification,
  //     );
  //   });

  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from quit state ',
  //       remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;


  // }, []);



  // const [expoPushToken, setExpoPushToken] = useState('');

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   const subscription = Notifications.addNotificationReceivedListener(notification => {
  //     console.log(notification);
  //   });

  //   return () => subscription.remove();
  // }, []);

  // const registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       Alert.alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     Alert.alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // };

  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Tips" component={Tips} />
        <Stack.Screen name="TipDetail" component={TipDetail} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Records" component={Records} />
        <Stack.Screen name="NewMedicineReminder" component={NewMedicineReminder} />
        <Stack.Screen name="UpdateMedicineReminder" component={UpdateMedicineReminder} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
