// Conversation.js
import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow';
// import dialogflowConfig from '../assets/myfirstagent-tjct-91839747b0c7.json'; 

const Conversation = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  // useEffect(() => {
  //   Dialogflow_V2.setConfiguration(
  //     dialogflowConfig.client_email,
  //     dialogflowConfig.private_key,
  //     Dialogflow_V2.LANG_ENGLISH,
  //     dialogflowConfig.project_id
  //   );
  // }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { sender: 'user', text: message }];
      setMessages(newMessages);
      setMessage('');
      Dialogflow_V2.requestQuery(
        message,
        result => {
          console.log('Dialogflow response:', result); // Log the full response from Dialogflow
          if (result && result.queryResult && result.queryResult.fulfillmentText) {
            const botMessage = result.queryResult.fulfillmentText;
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
          } else {
            console.error('No fulfillment text found in Dialogflow response');
          }
        },
        error => {
          console.error('Dialogflow request failed', error); // Log any errors
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f0f0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Conversation;
