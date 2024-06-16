import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import BottomMenu from '../components/BottomMenu';
import statsData from '../assets/stats.json';

const Stats = ({ navigation }) => {
  const chartComponents = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Stats</Text>
      </View>
      <ScrollView style={styles.contentScroll}>
        <View style={styles.statsContainer}>
          {statsData.map((stat, index) => {
            const ChartComponent = chartComponents[stat.type];
            return (
              <View key={index} style={styles.statCard}>
                <ChartComponent data={stat.data} options={stat.options} />
              </View>
            );
          })}
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
  statsContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    marginBottom: 25,
    padding: 15,
    shadowColor: '#5C68A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Stats;
