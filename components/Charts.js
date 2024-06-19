// components/Charts.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';

const Charts = () => {
  const pieChartData = [
    { name: 'Cancer', population: 2, color: '#CDE8E5', legendFontColor: 'black', legendFontSize: 15 },
    { name: 'Heart', population: 5, color: '#EEF7FF', legendFontColor: '#000', legendFontSize: 15 },
    { name: 'Diabetes', population: 3, color: '#7AB2B2', legendFontColor: '#000', legendFontSize: 15 },
    { name: 'Obesity', population: 7, color: '#4D869C', legendFontColor: '#000', legendFontSize: 15 },
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
    <View style={styles.chartContainer}>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Health Conditions</Text>
        <PieChart
          data={pieChartData}
          width={260}
          height={170}
          borderRadius={10}
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

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Health Risks</Text>
        <BarChart
          data={barChartData}
          width={260}
          height={170}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: '#1E3C42',
            backgroundGradientTo: '#1E3C42',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Health Trends</Text>
        <LineChart
          data={lineChartData}
          width={260}
          height={170}
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
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    borderWidth: 0.4,
    borderColor: 'lightgrey',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E3C42',
  },
});

export default Charts;
