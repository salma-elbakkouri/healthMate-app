import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, FlatList, ActivityIndicator } from 'react-native';
import BottomMenu from './BottomMenu';
import { fetchMedicineReminders, deleteMedicineReminder } from '../config/authFunctions';
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';

const Reminder = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const loadReminders = async () => {
      const fetchedMedicines = await fetchMedicineReminders(userId);
      setMedicines(fetchedMedicines);
      logReminders(fetchedMedicines); // Log all details including doses
      setLoading(false);
    };

    loadReminders();
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      const loadReminders = async () => {
        setLoading(true);
        const fetchedMedicines = await fetchMedicineReminders(userId);
        setMedicines(fetchedMedicines);
        logReminders(fetchedMedicines); // Log all details including doses
        setLoading(false);
      };

      loadReminders();
    }, [userId])
  );

  const handleDelete = async (docId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteMedicineReminder(docId);
            setMedicines(medicines.filter(med => med.id !== docId));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Log all details of the medicine reminders, including doses
  const logReminders = (reminders) => {
    reminders.forEach(reminder => {
      console.log(`Pill name: ${reminder.pillName}`);
      console.log(`Amount: ${reminder.amount}`);
      console.log(`Frequency: ${reminder.frequency}`);
      console.log(`Begin Date: ${reminder.beginDate}`);
      console.log(`End Date: ${reminder.endDate}`);

      // Log all doses dynamically
      ['firstDose', 'secondDose', 'thirdDose'].forEach((dose, index) => {
        if (reminder[dose]) {
          console.log(`${index + 1}st dose: ${reminder[dose]}`);
        }
      });

      console.log('-----------------------');
    });
  };

  // Render only pill name, amount, and frequency in the UI
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={require('../assets/calend.png')} style={styles.pillImage} />
      <View style={styles.cardContent}>
        <Text style={styles.pillName}>{item.pillName}</Text>
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.frequency}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.amount} pills</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconColumn}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
          <Icon name="trash" size={20} color="#667ad9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('UpdateMedicineReminder', { reminderId: item.id })}>
          <Icon name="pencil" size={20} color="#667ad9" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicines</Text>
      </View>
      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#4D869C" />
        </View>
      ) : medicines.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.text}>Oops no medication reminders found!!</Text>
          <Image source={require('../assets/notfound.png')} style={styles.notfound} />
        </View>
      ) : (
        <FlatList
          data={medicines}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      <View style={styles.newReminderButtonContainer}>
        <TouchableOpacity
          style={styles.newReminderButton}
          onPress={() => navigation.navigate('NewMedicineReminder')}
        >
          <Text style={styles.newReminderText}>Add New Reminder</Text>
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
  },
  whiteHeader: {
    height: 110,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginLeft: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#31477A',
    marginBottom: 20,
  },
  notfound: {
    height: 190,
    width: 280,
  },
  newReminderButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  newReminderButton: {
    backgroundColor: '#4D869C',
    width: '97%',
    height: 47,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  newReminderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#5b548d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  pillImage: {
    width: 50,
    height: 50,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
  },
  pillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#31477A',
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 10,
  },
  tagText: {
    color: '#666666',
    fontSize: 10,
  },
  iconColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});

export default Reminder;
