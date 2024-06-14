import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteHeader}>
        <View style={styles.headerContent}>
          <View style={styles.leftContent}>
            <Text style={styles.usernameText}>Hello username</Text>
            <Text style={styles.healthText}>Improve Your Health</Text>
          </View>
          <View style={styles.rightContent}>
            <Image
              source={require('../assets/doctor.png')} // Assuming you have user.png here
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['#4E869D', '#C6E3E1']}
        style={styles.gradientBackground}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome to Health Mate</Text>
          <Image
            source={require('../assets/doctor.png')}
            style={styles.doctorImage}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems:'center',
  },
  whiteHeader: {
    height: 120,
    width:'100%',
    backgroundColor: 'white',
    paddingTop: 20, 
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftContent: {
    flex: 1,
  },
  usernameText: {
    fontSize: 14,
    color: '#888B94',
  },
  healthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3C42',
  },
  rightContent: {
    marginLeft: 10, 
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, 
  },
  contentContainer : {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  gradientBackground: {
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'90%',
    borderRadius:20,
  },
  welcomeText :{
    fontSize:18,
    width:120,
    lineHeight:25,
    color:'white',
    fontWeight:'bold',
  },
  doctorImage : 
  {
    height:150,
    width:150,
  }
});

export default Home;
