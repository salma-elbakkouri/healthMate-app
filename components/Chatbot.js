import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'

const Chatbot = () => {
    const [messages, setMessages] = useState([]);

    const API_KEY = 'sk-proj-NekCVividDluSkgv0S8qT3BlbkFJSuhfayZGi5i71jD06qAL';

    const handleSend = async (newMessages = []) => {
        const userMessage = newMessages[0];
        setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
    
        const messageText = userMessage.text.toLowerCase();
        const healthKeywords = ['health', 'disease', 'sick', 'symptoms', 'medication', 'medicine', 'treatment', 'therapy'];
    
        if (!healthKeywords.some(keyword => messageText.includes(keyword))) {
            const botMessage = {
                _id: new Date().getTime() + 1,
                text: "I am your Health Bot. Please ask me anything related to health and medication.",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Health Bot',
                }
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
            return;
        }
    
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `What are the symptoms for ${messageText}?` }
                ],
                max_tokens: 150,
                temperature: 0.5,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
    
            const symptoms = response.data.choices[0]?.message?.content.trim() || 'I could not retrieve any information.';
            const botMessage = {
                _id: new Date().getTime() + 1,
                text: symptoms,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Health Bot',
                }
            };
    
            setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
    
        } catch (error) {
            console.error('Error fetching data from API:', error);
            const botMessage = {
                _id: new Date().getTime() + 1,
                text: 'There was an error retrieving information. Please try again later.',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Health Bot',
                }
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        }
    };
    
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Health Bot
                </Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => handleSend(newMessages)}
                user={{ _id: 1 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 40,
        marginBottom: 5,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

export default Chatbot;
