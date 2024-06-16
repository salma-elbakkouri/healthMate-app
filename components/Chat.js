import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomMenu from './BottomMenu'; // Import BottomMenu component

const Chat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top White Header */}
      <View style={styles.whiteHeader}>
        <View style={styles.headerContent}>
          <View style={styles.leftContent}>
            <Text style={styles.usernameText}>Hello username</Text>
            <Text style={styles.healthText}>Improve Your Health</Text>
          </View>
          <View style={styles.rightContent}>
            <Image
              source={require('../assets/doctor.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.boldText}>Welcome to Dr. Chat</Text>
        <Text style={styles.subText}>
          Your virtual health assistant, ready to answer all your health-related questions.
        </Text>
        <TouchableOpacity style={styles.chatButton}>
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
  whiteHeader: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftContent: {
    flex: 1,
  },
  usernameText: {
    fontSize: 14,
    color: '#888B94',
  },
  healthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3C42',
  },
  rightContent: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
    lineHeight:23,
    marginBottom: 20,
  },
  chatButton: {
    backgroundColor: '#1E3942',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height:400,
  },
});

export default Chat;
