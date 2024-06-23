import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tipsData from '../assets/tips.json';
import BottomMenu from '../components/BottomMenu';

const tipImages = {
  depressiontip: require('../assets/home/depressiontip.png'),
  nutritiontip: require('../assets/home/nutritiontip.png'),
  catshealthtip: require('../assets/home/catshealthtip.png'),
  socialmediatip: require('../assets/home/socialmediatip.png'),
};

const Tips = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Tips</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.tipsContainer}>
          {tipsData.map((tip, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.tipCard} 
              onPress={() => navigation.navigate('TipDetail', { tipId: index })}
            >
              <Image source={tipImages[tip.image]} style={styles.tipImage} />
              <View style={styles.tipOverlay}>
                <Text style={styles.tipSubject}>{tip.subject}</Text>
                <View style={styles.tipViews}>
                  <FontAwesome name="eye" size={12} color="white" />
                  <Text style={styles.viewsText}>{`${tip.views} views`}</Text>
                </View>
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
  tipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  tipCard: {
    width: '48%',
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  tipImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tipOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
  tipSubject: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipViews: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  viewsText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default Tips;
