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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Tips" component={Tips} />
        <Stack.Screen name="TipDetail" component={TipDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
