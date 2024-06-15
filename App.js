// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Articles from './components/Articles';
import Chat from './components/Chat';
import Reminder from './components/Reminder';
import Notifications from './components/Notifications';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
