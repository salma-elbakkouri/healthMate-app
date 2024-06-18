import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, KeyboardAvoidingView, Modal, FlatList, Platform } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomMenu from './BottomMenu';
import { saveMedicineReminder } from '../config/authFunctions';
import { getAuth } from 'firebase/auth';


const NewMedicineReminder = () => {
  const [medication, setMedication] = useState('');
  const [pillCount, setPillCount] = useState(4);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [frequency, setFrequency] = useState('3 times');
  const [doses, setDoses] = useState({ firstDose: '8:00 AM', secondDose: '12:00 PM', thirdDose: '6:00 PM' });
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState({ visible: false, field: '' });
  const [showDatePicker, setShowDatePicker] = useState({ visible: false, field: '' });

  const frequencies = ['1 time', '2 times', '3 times'];
  

  const handleSave = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    console.log('Save button pressed');

    try {
      await saveMedicineReminder(
        userId,
        medication,
        pillCount,
        frequency,
        beginDate,
        endDate,
        doses,
        notificationEnabled
      );
    } catch (error) {
      console.error('Error saving medicine reminder:', error);
      Alert.alert('Error', 'Failed to save medicine reminder. Please try again.');
    }
  };

  const handleFrequencySelect = (item) => {
    setFrequency(item);
    setModalVisible(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
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
          <TouchableOpacity onPress={() => console.log('Back button pressed')}>
            <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
          </TouchableOpacity>
          <Text style={styles.newReminder}>New Medicine Reminder</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Pills name</Text>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="pills" size={16} color="#4D869C" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                value={medication}
                onChangeText={(text) => setMedication(text)}
                placeholder="Enter pill name"
              />
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
            <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
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
              <Text style={styles.label}>Finish</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowDatePicker({ visible: true, field: 'endDate' })}
              >
                <FontAwesome name="calendar" size={16} color="#4D869C" style={styles.inputIcon} />
                <Text style={[styles.textInput, styles.centeredText]}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>1st dose</Text>
              <TouchableOpacity
                style={[styles.inputContainer, !isDoseEnabled(0) && styles.disabledInput]}
                onPress={() => isDoseEnabled(0) && setShowTimePicker({ visible: true, field: 'firstDose' })}
                disabled={!isDoseEnabled(0)}
              >
                <Text style={[styles.textInput, styles.centeredText]}>{doses.firstDose}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>2nd dose</Text>
              <TouchableOpacity
                style={[styles.inputContainer, !isDoseEnabled(1) && styles.disabledInput]}
                onPress={() => isDoseEnabled(1) && setShowTimePicker({ visible: true, field: 'secondDose' })}
                disabled={!isDoseEnabled(1)}
              >
                <Text style={[styles.textInput, styles.centeredText]}>{doses.secondDose}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>3rd dose</Text>
              <TouchableOpacity
                style={[styles.inputContainer, !isDoseEnabled(2) && styles.disabledInput]}
                onPress={() => isDoseEnabled(2) && setShowTimePicker({ visible: true, field: 'thirdDose' })}
                disabled={!isDoseEnabled(2)}
              >
                <Text style={[styles.textInput, styles.centeredText]}>{doses.thirdDose}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroupRow}>
            <Text style={styles.label}>Notification</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={() => setNotificationEnabled(!notificationEnabled)}
              trackColor={{ true: '#4D869C', false: '#ccc' }}
              thumbColor={notificationEnabled ? '#4D869C' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Medicine</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomMenu activeScreen="Notifications" />

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={frequencies}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleFrequencySelect(item)}>
                    <Text style={styles.modalItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {showDatePicker.visible && (
          <DateTimePicker
            value={showDatePicker.field === 'beginDate' ? beginDate : endDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker.visible && (
          <DateTimePicker
            value={new Date(parseTimeString(doses[showTimePicker.field]))}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
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

