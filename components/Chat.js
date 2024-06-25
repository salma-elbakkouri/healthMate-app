import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomMenu from './BottomMenu'; // Import BottomMenu component
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ navigation }) => {



  return (
    <View style={styles.container}>
   

      <View style={styles.content}>
        <Text style={styles.boldText}>Welcome to Dr. Chat</Text>
        <Text style={styles.subText}>
          Your virtual health assistant, ready to answer all your health-related questions.
        </Text>
        <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chatbot')}>
          <Text style={styles.chatButtonText}>Start Chatting</Text>
        </TouchableOpacity>
        
        <Image
          source={require('../assets/drchat.png')}
          style={styles.image}
        />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  boldText: {
    fontSize: 22,
    color: '#2A4D58',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 15,
    color: '#A4A4A4',
    textAlign: 'center',
    marginHorizontal: 30,
    lineHeight: 23,
    marginBottom: 20,
  },
  chatButton: {
    backgroundColor: '#1E3942',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 100,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: 400,
    bottom:50,
  },
});

export default Chat;
