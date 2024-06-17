import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';

const Stats = ({ navigation }) => {
  // Dummy data for charts
  const pieChartData = [
    { name: 'Cancer', population: 2, color: '#FFC0CB', legendFontColor: 'black', legendFontSize: 15 },
    { name: 'Heart', population: 5, color: '#ADD8E6', legendFontColor: '#000', legendFontSize: 15 },
    { name: 'Diabetes', population: 3, color: '#87CEFA', legendFontColor: '#000', legendFontSize: 15 },
    { name: 'Obesity', population: 7, color: '#FFD700', legendFontColor: '#000', legendFontSize: 15 },
  ];

  const barChartData = {
    labels: ['Cancer', 'Heart', 'Diabetes', 'Obesity'],
    datasets: [
      {
        data: [2, 5, 3, 7],
      },
    ],
  };

  const lineChartData = {
    labels: ['Cancer', 'Heart', 'Diabetes', 'Obesity'],
    datasets: [
      {
        data: [2, 5, 3, 7],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="#1E3C42" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Statistics</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.chartContainer}>
          {/* Pie Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Health Conditions</Text>
            <PieChart
              data={pieChartData}
              width={280}
              height={190}
              chartConfig={{
                backgroundGradientFrom: '#1E3C42',
                backgroundGradientTo: '#1E3C42',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>

          {/* Bar Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Health Risks</Text>
            <BarChart
              data={barChartData}
              width={280}
              height={190}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: '#1E3C42',
                backgroundGradientTo: '#1E3C42',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={styles.chart}
            />
          </View>

          {/* Line Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Health Trends</Text>
            <LineChart
              data={lineChartData}
              width={280}
              height={190}
              chartConfig={{
                backgroundGradientFrom: '#1E3C42',
                backgroundGradientTo: '#1E3C42',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={styles.chart}
              bezier
            />
          </View>
        </View>
      </ScrollView>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3C42',
    marginLeft: 20,
  },
  scrollContent: {
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20, 
    padding: 20,
    borderWidth:0.4,
    borderColor:'lightgrey',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E3C42',
  },
});

export default Stats;
