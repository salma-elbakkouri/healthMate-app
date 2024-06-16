import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tipsData from '../assets/tips.json';
import BottomMenu from '../components/BottomMenu';

const tipImages = {
  depressiontip: require('../assets/depressiontip.png'),
  nutritiontip: require('../assets/nutritiontip.png'),
  catshealthtip: require('../assets/catshealthtip.png'),
  socialmediatip: require('../assets/socialmediatip.png'),
};

const TipDetail = ({ route, navigation }) => {
  const { tipId } = route.params;
  const tipCategory = tipsData[tipId];

  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{tipCategory.subject}</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.tipDetailContainer}>
          <Image source={tipImages[tipCategory.image]} style={styles.tipImage} />
          {tipCategory.tips.map((tip, index) => (
            <View key={index}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
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
  tipDetailContainer: {
    marginBottom: 80,
    marginHorizontal: 10,
  },
  tipImage: {
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    color: '#162050',
    fontWeight: 'bold',
    marginTop: 15,
  },
  tipDescription: {
    fontSize: 12,
    color: '#7582A2',
    marginTop: 7,
    lineHeight: 20,
  },
});

export default TipDetail;
