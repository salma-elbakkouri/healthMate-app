import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView , TouchableOpacity } from 'react-native';
import recordsData from '../assets/records.json';
import BottomMenu from '../components/BottomMenu';
import { FontAwesome } from '@expo/vector-icons'; // For icons

// Define the images used for each record category
const recordsImages = {
  heart: require('../assets/heart.jpg'),
  cancer: require('../assets/cancer.jpg'),
  kidney: require('../assets/kidney2.png'),
  cells: require('../assets/cells2.png'),
  kidneytumors: require('../assets/kidneytumors2.png'),
  lungs: require('../assets/lungs2.png'),
};

const Records = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Articles</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.recordsContainer}>
          {recordsData.map((record, index) => (
            // Render each record's details in a card
            <View key={index} style={styles.recordCard}>
              {/* Top Section: Image, Title, and Description */}
              <View style={styles.topSection}>
                <Image source={recordsImages[record.image]} style={styles.recordImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.recordTitle}>{record.subject}</Text>
                  <Text style={styles.generalDescription}>{record.description}</Text>
                </View>
              </View>
              <View style={styles.bottomSection}>
                <Text style={styles.recordsTitle}>Records</Text> 
                {record.details.map((detail, detailIndex) => (
                  <View key={detailIndex} style={styles.recordDetail}>
                    <Text style={styles.recordDetailYear}>{detail.year}</Text>
                    <Text style={styles.recordDetailDescription}>{detail.description}</Text>
                  </View>
                ))}
              </View>
            </View>
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
    backgroundColor: 'white',
    borderRadius: 10,
    width: 315,
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: '#5C68A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  recordImage: {
    width: 83,
    height: 100,
    borderRadius: 10,
  },
  recordTitle: {
    fontSize: 14,
    color: '#162050',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  generalDescription: {
    fontSize: 12,
    color: '#7582A2',
    marginBottom: 10,
  },
  bottomSection: {
    paddingHorizontal:20,
    paddingBottom: 10,
  },
  recordsTitle: {
    fontSize: 14, 
    color: '#162050',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recordDetail: {
    marginBottom: 10,
  },
  recordDetailYear: {
    fontSize: 12,
    color: '#7582A2',
    fontWeight: 'bold',
  },
  recordDetailDescription: {
    fontSize: 12,
    color: '#7582A2',
  },
});

export default Records;
