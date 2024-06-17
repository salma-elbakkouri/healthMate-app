import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import recordsData from '../assets/records.json';
import BottomMenu from '../components/BottomMenu'; // Import BottomMenu component

const recordImages = {
  india: require('../assets/depression.png'), // Example image path, adjust as per your assets
  usa: require('../assets/steroids.png'), // Example image path, adjust as per your assets
  // Add more images as needed based on your recordsData structure
};

const Records = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Records</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.recordsContainer}>
          {recordsData.map((record, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recordCard}
              onPress={() => navigation.navigate('RecordDetail', { recordId: index })}
            >
              <Image source={recordImages[record.image]} style={styles.recordImage} />
              <View style={styles.recordContent}>
                <Text style={styles.recordTitle}>{record.title}</Text>
                <Text style={styles.recordDescription}>{record.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginLeft: 20,
  },
  contentScroll: {
    width: '90%',
    marginTop: 10,
  },
  recordsContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  recordCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 315,
    height: 100,
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: '#5C68A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  recordImage: {
    width: 83,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  recordContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  recordTitle: {
    fontSize: 14,
    color: '#162050',
    fontWeight: 'bold',
    width: 215,
    height: 42,
  },
  recordDescription: {
    fontSize: 12,
    color: '#7582A2',
  },
});

export default Records;
