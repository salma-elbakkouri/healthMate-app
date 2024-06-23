import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
// import dialogflowConfig from '../assets/myfirstagent-tjct-cf15507a4e1e.json';

const Conversation = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef();

  useEffect(() => {
    // Dialogflow_V2.setConfiguration(
    //   dialogflowConfig.client_email,
    //   dialogflowConfig.private_key,
    //   Dialogflow_V2.LANG_ENGLISH,
    //   dialogflowConfig.project_id
    // );

    // Simulate a delay for loading (you can remove this in a real-world app)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this duration as needed
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { sender: 'user', text: message }];
      setMessages(newMessages);
      setMessage('');
      Dialogflow_V2.requestQuery(
        message,
        result => {
          console.log('Dialogflow response:', result);
          if (result && result.queryResult && result.queryResult.fulfillmentText) {
            const botMessage = result.queryResult.fulfillmentText;
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
          } else {
            console.error('No fulfillment text found in Dialogflow response');
          }
        },
        error => {
          console.error('Dialogflow request failed', error);
        }
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={msg.sender === 'user' ? styles.userText : styles.botText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 18,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E3942',
    borderTopRightRadius: 4,
    paddingVertical:11,
    paddingHorizontal:15,
    top:20,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f0f0',
    borderBottomLeftRadius: 4,
    paddingVertical:11,
    paddingHorizontal:15,
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1E3942',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 35,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Conversation;
