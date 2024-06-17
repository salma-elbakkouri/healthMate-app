import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, KeyboardAvoidingView, Modal, FlatList } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import BottomMenu from './BottomMenu';

const NewMedicineReminder = () => {
  const [medication, setMedication] = useState('');
  const [pillCount, setPillCount] = useState(4);
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [frequency, setFrequency] = useState('3 times');
  const [doses, setDoses] = useState({ firstDose: '8:00 AM', secondDose: '12:00 PM', thirdDose: '6:00 PM' });
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const frequencies = ['1 time', '2 times', '3 times'];

  const handleFrequencySelect = (item) => {
    setFrequency(item);
    setModalVisible(false);
  };

  console.log('Medication:', medication);
  console.log('Pill Count:', pillCount);
  console.log('Begin Date:', beginDate);
  console.log('End Date:', endDate);
  console.log('Frequency:', frequency);
  console.log('Doses:', doses);
  console.log('Notification Enabled:', notificationEnabled);

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
              <View style={styles.inputContainer}>
                <FontAwesome name="calendar" size={16} color="#4D869C" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="DD MMM"
                  value={beginDate}
                  onChangeText={(text) => setBeginDate(text)}
                />
              </View>
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Finish</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="calendar" size={16} color="#4D869C" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="DD MMM"
                  value={endDate}
                  onChangeText={(text) => setEndDate(text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>1st dose</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={doses.firstDose}
                  onChangeText={(text) => setDoses({ ...doses, firstDose: text })}
                />
              </View>
            </View>

            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>2nd dose</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={doses.secondDose}
                  onChangeText={(text) => setDoses({ ...doses, secondDose: text })}
                />
              </View>
            </View>

            <View style={[styles.formGroup, styles.thirdWidth]}>
              <Text style={styles.label}>3rd dose</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={doses.thirdDose}
                  onChangeText={(text) => setDoses({ ...doses, thirdDose: text })}
                />
              </View>
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

          <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save button pressed')}>
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
    paddingBottom: 140,  
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
