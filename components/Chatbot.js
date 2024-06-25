// ChatbotApp.js

import React, { useState, useRef } from "react";
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const ChatbotApp = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Hello! I am your health chatbot. How can I help you today?",
			sender: 'bot',
		},
	]);
	const scrollViewRef = useRef();

	const handleSend = () => {
		if (message.trim()) {
			const userMessage = {
				id: messages.length + 1,
				text: message,
				sender: 'user',
			};
			setMessages((prevMessages) => [...prevMessages, userMessage]);
			setMessage('');

			const botResponse = generateChatbotResponse(message);
			const botMessage = {
				id: messages.length + 2,
				text: botResponse,
				sender: 'bot',
			};
			setMessages((prevMessages) => [...prevMessages, botMessage]);
		}
	};

	const generateChatbotResponse = (userMessage) => {
		const lowerCaseMessage = userMessage.toLowerCase();
		if (lowerCaseMessage.includes("hello")) {
			return "Hi there! How can I assist you today?";
		}
		if (lowerCaseMessage.includes("how are you")) {
			return "I am just a chatbot, but thanks for asking!";
		}
		if (lowerCaseMessage.includes("bye")) {
			return "Goodbye! If you have more questions, feel free to ask.";
		}
		if (lowerCaseMessage.includes("cancer")) {
			return "Cancer is a group of diseases characterized by uncontrolled growth and spread of abnormal cells. Early detection and treatment are crucial for better outcomes.";
		}
		if (lowerCaseMessage.includes("therapy")) {
			return "Therapy can refer to a variety of treatments. For mental health, it often means talking to a therapist to help manage emotions, thoughts, and behaviors.";
		}
		if (lowerCaseMessage.includes("mental health")) {
			return "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act, and is important at every stage of life.";
		}
		if (lowerCaseMessage.includes("anxiety")) {
			return "Anxiety is a feeling of fear or apprehension about what's to come. It can be a normal reaction to stress, but chronic anxiety may need professional treatment.";
		}
		if (lowerCaseMessage.includes("depression")) {
			return "Depression is a common and serious mood disorder. It causes severe symptoms that affect how you feel, think, and handle daily activities. Treatment often involves medication, therapy, or both.";
		}
		if (lowerCaseMessage.includes("fitness")) {
			return "Fitness involves maintaining a healthy body through regular physical activity, balanced nutrition, and adequate rest. It’s key to overall well-being.";
		}
		if (lowerCaseMessage.includes("social media")) {
			return "Social media has transformed how we communicate, but excessive use can affect mental health. It's important to use it mindfully and maintain a healthy balance.";
		}
		if (lowerCaseMessage.includes("fast food")) {
			return "Fast food is convenient and often tasty, but it's usually high in calories, sugar, and unhealthy fats. Frequent consumption can lead to health issues like obesity and heart disease.";
		}
		if (lowerCaseMessage.includes("animal health")) {
			return "Animal health is crucial for pets and livestock. Regular veterinary check-ups, a balanced diet, and proper care are essential for keeping animals healthy and happy.";
		}
		if (lowerCaseMessage.includes("steroids")) {
			return "Steroids can be used medically to treat conditions like inflammation and immune disorders. However, misuse of anabolic steroids for muscle building can have serious health risks.";
		}
		if (lowerCaseMessage.includes("heart")) {
			return "Heart health is vital. Maintaining a healthy diet, exercising regularly, and avoiding smoking can reduce the risk of heart diseases like heart attacks and strokes.";
		}
		if (lowerCaseMessage.includes("kidney")) {
			return "Kidneys filter waste from your blood and regulate fluid balance. Keeping hydrated, managing blood pressure, and reducing salt intake help maintain kidney health.";
		}
		if (lowerCaseMessage.includes("fracture")) {
			return "A fracture is a break in a bone. Treatment typically involves immobilization with a cast or splint, and in some cases, surgery. Proper rest and nutrition are important for healing.";
		}
		return "I'm sorry, I didn't understand that. Can you please rephrase your question or ask about another health topic?";
	};

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.messagesContainer}
				ref={scrollViewRef}
				onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
			>
				{messages.map((msg) => (
					<View
						key={msg.id}
						style={[
							styles.message,
							msg.sender === 'user' ? styles.userMessage : styles.botMessage,
						]}
					>
						<Text style={msg.sender === 'user' ? styles.userText : styles.botText}>
							{msg.text}
						</Text>
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
		padding: 20,
		backgroundColor: '#fff',
	},
	messagesContainer: {
		flex: 1,
		marginTop: 40,
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
		paddingVertical: 11,
		paddingHorizontal: 15,
		top: 10,
		marginBottom: 20,
	},
	botMessage: {
		alignSelf: 'flex-start',
		backgroundColor: '#f1f0f0',
		borderBottomLeftRadius: 4,
		paddingVertical: 11,
		paddingHorizontal: 15,
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
});

export default ChatbotApp;
