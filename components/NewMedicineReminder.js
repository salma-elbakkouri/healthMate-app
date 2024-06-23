import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, KeyboardAvoidingView, Modal, FlatList, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomMenu from './BottomMenu';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Reminder from './Reminder'; 
import { saveMedicineReminder } from '../config/authFunctions';

const NewMedicineReminder = () => {
  const navigation = useNavigation();
  const [medication, setMedication] = useState('');
  const [pillCount, setPillCount] = useState(0);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [frequency, setFrequency] = useState('');
  const [doses, setDoses] = useState({ firstDose: '', secondDose: '', thirdDose: '' });
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [medicationModalVisible, setMedicationModalVisible] = useState(false);
  const [frequencyModalVisible, setFrequencyModalVisible] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState({ visible: false, field: '' });
  const [showDatePicker, setShowDatePicker] = useState({ visible: false, field: '' });

  const frequencies = ['1 time', '2 times', '3 times'];
  const pills = [
    'Paracetamol Extra',
    'Doliprane',
    'Vitamin C',
    'Ibuprofen',
    'Aspirin',
    'Amoxicillin',
    'Metformin',
    'Simvastatin',
    'Omeprazole',
    'Lisinopril'
  ];

  const handleSave = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    try {
      const times = parseInt(frequency.split(' ')[0], 10);
      const selectedDoses = {};
      if (times >= 1) selectedDoses.firstDose = doses.firstDose;
      if (times >= 2) selectedDoses.secondDose = doses.secondDose;
      if (times >= 3) selectedDoses.thirdDose = doses.thirdDose;

      await saveMedicineReminder(
        userId,
        medication,
        pillCount,
        frequency,
        beginDate,
        endDate,
        selectedDoses,
        notificationEnabled
      );

      Alert.alert('Success', 'Medicine reminder added successfully.');
      navigation.navigate(Reminder);
    } catch (error) {
      console.error('Error adding medicine reminder:', error);
      Alert.alert('Error', 'Failed to add medicine reminder. Please try again.');
    }
  };

  const handleFrequencySelect = (item) => {
    setFrequency(item);
    setFrequencyModalVisible(false);
  };

  const handleMedicationSelect = (item) => {
    setMedication(item);
    setMedicationModalVisible(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12;
      const formattedTime = `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;

      setDoses((prevDoses) => ({
        ...prevDoses,
        [showTimePicker.field]: formattedTime,
      }));
    }
    setShowTimePicker({ visible: false, field: '' });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      if (showDatePicker.field === 'beginDate') {
        setBeginDate(selectedDate);
      } else if (showDatePicker.field === 'endDate') {
        setEndDate(selectedDate);
      }
    }
    setShowDatePicker({ visible: false, field: '' });
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const parseTimeString = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = 0;
    }
    return new Date().setHours(hours, minutes, 0);
  };

  const isDoseEnabled = (doseIndex) => {
    const times = parseInt(frequency.split(' ')[0], 10);
    return doseIndex < times;
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
      <View style={styles.container}>
        <View style={styles.whiteHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
          </TouchableOpacity>
          <Text style={styles.newReminder}>Add New Medicine Reminder</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Pills name</Text>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="pills" size={16} color="#4D869C" style={styles.inputIcon} />
              <TouchableOpacity
                style={styles.textInput}
                onPress={() => setMedicationModalVisible(true)}
              >
                <Text style={styles.textInput}>{medication}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountControl}>
              <TouchableOpacity onPress={() => setPillCount(Math.max(0, pillCount - 1))}>
                <FontAwesome name="minus" size={16} color="#4D869C" />
              </TouchableOpacity>
              <TextInput
                style={styles.amountInput}
                value={pillCount.toString()}
                keyboardType="numeric"
                onChangeText={(text) => setPillCount(parseInt(text))}
              />
              <TouchableOpacity onPress={() => setPillCount(pillCount + 1)}>
                <FontAwesome name="plus" size={16} color="#4D869C" style={styles.plusIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Frequency per day</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={() => setFrequencyModalVisible(true)}>
              <FontAwesome name="hashtag" size={16} color="#4D869C" style={styles.inputIcon} />
              <Text style={[styles.textInput, { lineHeight: 50 }]}>{frequency}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Begin</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowDatePicker({ visible: true, field: 'beginDate' })}
              >
                <FontAwesome name="calendar" size={16} color="#4D869C" style={styles.inputIcon} />
                <Text style={[styles.textInput, styles.centeredText]}>{formatDate(beginDate)}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>End</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowDatePicker({ visible: true, field: 'endDate' })}
              >
                <FontAwesome name="calendar" size={16} color="#4D869C" style={styles.inputIcon} />
                <Text style={[styles.textInput, styles.centeredText]}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isDoseEnabled(0) && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>First dose</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowTimePicker({ visible: true, field: 'firstDose' })}
              >
                <FontAwesome name="clock-o" size={16} color="#4D869C" style={styles.inputIcon} />
                <Text style={[styles.textInput, styles.centeredText]}>{doses.firstDose}</Text>
              </TouchableOpacity>
            </View>
          )}
          {isDoseEnabled(1) && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Second dose</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowTimePicker({ visible: true, field: 'secondDose' })}
              >
                <FontAwesome name="clock-o" size={16} color="#4D869C" style={styles.inputIcon} />
                <Text style={[styles.textInput, styles.centeredText]}>{doses.secondDose}</Text>
              </TouchableOpacity>
            </View>
          )}
          {isDoseEnabled(2) && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Third dose</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowTimePicker({ visible: true, field: 'thirdDose' })}
              >
                <FontAwesome name="clock-o" size={16} color="#4D869C" style={styles.inputIcon} />
                <Text style={[styles.textInput, styles.centeredText]}>{doses.thirdDose}</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.notifFormGroup}>
            <Text style={styles.label}>Notification</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationEnabled ? '#4D869C' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
        <BottomMenu />
      </View>

      {showTimePicker.visible && (
        <DateTimePicker
          value={new Date(parseTimeString(doses[showTimePicker.field] || '12:00 PM'))}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {showDatePicker.visible && (
        <DateTimePicker
          value={showDatePicker.field === 'beginDate' ? beginDate : endDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Modal visible={medicationModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Medication</Text>
            <FlatList
              data={pills}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleMedicationSelect(item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setMedicationModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={frequencyModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Frequency</Text>
            <FlatList
              data={frequencies}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleFrequencySelect(item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setFrequencyModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
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
    marginBottom: 20,
  },
  newReminder: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginLeft: 20,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  formGroup: {
    marginBottom: 20,
  },
  notifFormGroup:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20,
  },
  formGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
    shadowColor: '#4D869C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
  },
  centeredText: {
    textAlignVertical: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  amountControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    shadowColor: '#4D869C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  amountInput: {
    width: 50,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  plusIcon: {
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  thirdWidth: {
    width: '30%',
  },
  saveButton: {
    backgroundColor: '#4D869C',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default NewMedicineReminder;
