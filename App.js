import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerForPushNotificationsAsync } from './components/notificationssending';
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';

import Home from './components/Home';
import Articles from './components/Articles';
import Chat from './components/Chat';
import Reminder from './components/Reminder';
import NotificationsScreen from './components/Notifications';
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
import UpdateMedicineReminder from './components/UpdateMedicineReminder';
import Conversation from './components/Conversation';
import './components/notifsetup'; // Ensure correct casing
import Chatbot from './components/Chatbot';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    // Handle notifications when the app is foregrounded
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  console.disableYellowBox = true;
  LogBox.ignoreAllLogs(true); // This disables all log notifications

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
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Tips" component={Tips} />
        <Stack.Screen name="TipDetail" component={TipDetail} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Records" component={Records} />
        <Stack.Screen name="NewMedicineReminder" component={NewMedicineReminder} />
        <Stack.Screen name="UpdateMedicineReminder" component={UpdateMedicineReminder} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
