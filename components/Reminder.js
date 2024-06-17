import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomMenu from './BottomMenu';

const Reminder = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>Oops no medication reminders found!!</Text>
        <Image source={require('../assets/notfound.png')} style={styles.notfound} />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.newReminderButton}
          onPress={() => navigation.navigate('NewMedicineReminder')}
        >
          <Text style={styles.newReminderText}>+</Text>
        </TouchableOpacity>
      </View>
      <BottomMenu activeScreen="Reminder" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },
  centeredContainer: {
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    flex:0.8,
  },
  text: {
    fontSize: 17,
    fontWeight: 'medium',
    color: '#31477A',
    marginBottom: 20,
  },
  notfound: {
    height: 190,
    width: 280,
  },
  bottomContainer: {
    paddingHorizontal: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  newReminderButton: {
    backgroundColor: '#4D869C',
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newReminderText: {
    color: 'white',
    fontSize: 30,
    letterSpacing: 1,
  }
});

export default Reminder;
