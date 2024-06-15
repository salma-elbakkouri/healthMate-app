import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5
import BottomMenu from './BottomMenu'; // Import BottomMenu component

const Chat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Hello, this is the Chat page</Text>
      </View>
      <BottomMenu activeScreen="Chat" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default Chat;
