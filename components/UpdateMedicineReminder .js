import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, KeyboardAvoidingView, Modal, FlatList, Platform, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomMenu from './BottomMenu';
import { updateMedicineReminder } from '../config/authFunctions'; // Make sure this function exists in your authFunctions file
import { getAuth } from 'firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import Reminder from './Reminder';

const UpdateMedicineReminder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { medicine } = route.params;

  const [medication, setMedication] = useState(medicine.pillName);
  const [pillCount, setPillCount] = useState(medicine.amount);
  const [beginDate, setBeginDate] = useState(new Date(medicine.beginDate));
  const [endDate, setEndDate] = useState(new Date(medicine.endDate));
  const [frequency, setFrequency] = useState(medicine.frequency);
  const [doses, setDoses] = useState(medicine.doses || { firstDose: '', secondDose: '', thirdDose: '' });
  const [notificationEnabled, setNotificationEnabled] = useState(medicine.notificationEnabled);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState({ visible: false, field: '' });
  const [showDatePicker, setShowDatePicker] = useState({ visible: false, field: '' });

  const frequencies = ['1 time', '2 times', '3 times'];

  const handleSave = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    console.log('Save button pressed');

    try {
      await updateMedicineReminder(
        medicine.id,
        userId,
        medication,
        pillCount,
        frequency,
        beginDate,
        endDate,
        doses,
        notificationEnabled
      );
      Alert.alert('Success', 'Medicine reminder updated successfully');
    } catch (error) {
      console.error('Error updating medicine reminder:', error);
      Alert.alert('Error', 'Failed to update medicine reminder. Please try again.');
    }
    navigation.navigate(Reminder);
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
          <Text style={styles.newReminder}>Update Medicine Reminder</Text>
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
                <Text style={[styles.textInput, styles.centeredText]}>{doses.firstDose || ''}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>2nd dose</Text>
              <TouchableOpacity
                style={[styles.inputContainer, !isDoseEnabled(1) && styles.disabledInput]}
                onPress={() => isDoseEnabled(1) && setShowTimePicker({ visible: true, field: 'secondDose' })}
                disabled={!isDoseEnabled(1)}
              >
                <Text style={[styles.textInput, styles.centeredText]}>{doses.secondDose || ''}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>3rd dose</Text>
              <TouchableOpacity
                style={[styles.inputContainer, !isDoseEnabled(2) && styles.disabledInput]}
                onPress={() => isDoseEnabled(2) && setShowTimePicker({ visible: true, field: 'thirdDose' })}
                disabled={!isDoseEnabled(2)}
              >
                <Text style={[styles.textInput, styles.centeredText]}>{doses.thirdDose || ''}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Notifications</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#4D869C' }}
              thumbColor={notificationEnabled ? '#0B7285' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setNotificationEnabled(value)}
              value={notificationEnabled}
            />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

      <BottomMenu />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
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
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showTimePicker.visible && (
        <DateTimePicker
          value={new Date(parseTimeString(doses[showTimePicker.field]))}
          mode="time"
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  whiteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  newReminder: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flexGrow: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  amountControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 10,
  },
  plusIcon: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  thirdWidth: {
    flex: 1,
    marginHorizontal: 5,
  },
  centeredText: {
    textAlign: 'center',
  },
  disabledInput: {
    backgroundColor: '#eeeeee',
  },
  saveButton: {
    backgroundColor: '#4D869C',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#4D869C',
    fontSize: 16,
  },
});

export default UpdateMedicineReminder;
