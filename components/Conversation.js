import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import { firestore } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

const Conversation = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(firestore, 'messages'), orderBy('timestamp', 'asc'));
        const querySnapshot = await getDocs(q);
        const messagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = {
      text: input,
      timestamp: serverTimestamp(),
      user: 'user',
    };

    try {
      await addDoc(collection(firestore, 'messages'), newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
      getBotResponse(input); // Get bot response after sending user message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getBotResponse = async (userMessage) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'GPT base',
          prompt: userMessage,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'MyAPI Key'
          },
        }
      );
  
      const botMessage = {
        text: response.data.choices[0].text.trim(),
        timestamp: serverTimestamp(),
        user: 'bot',
      };
  
      await addDoc(collection(firestore, 'messages'), botMessage);
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      console.error('Error details:', error.response); // Log the full error response
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={[styles.message, item.user === 'bot' ? styles.botMessage : styles.userMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  messageList: {
    flex: 1,
  },
  message: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#1E3942',
    fontWeight: 'bold',
  },
});

export default Conversation;
