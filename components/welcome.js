import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = () => {
  return (
    <LinearGradient
      colors={['#4E869D', '#C6E3E1']}
      style={[
        styles.container,
        Platform.OS === 'web' ? styles.containerWeb : null, // Apply different style for web
      ]}
    >
        <Image
          source={require('../assets/doctor.png')}
          style={styles.doctorImage}
        />
        <View style={styles.whiteContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>Stay Healthy Stay Happy with health AI</Text>
            <Text style={styles.smallText}>We will walk you each step in order to achieve better health</Text>
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={styles.buttonText}>START NOW</Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container : 
    {
        width: '100%',
        height: '100%',
        display : 'flex',
        flexDirection:'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    containerWeb: {
        width: '100vw',
        height: '100vh',
    },
    doctorImage : {
        width : 250,
        height : 250,
        resizeMode : 'contain'
    },
    whiteContainer : {
        width : 300,
        height : 290,
        backgroundColor:'white',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        padding: 20,
        borderRadius:50,
    },
    textContainer:  {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        width:'90%',
    },
    bigText : {
        textAlign:'center',
        color : '#1E3942',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:7,
        lineHeight:30,
    },
    smallText:  {
        textAlign:'center',
        color : '#A3A3AA',
        fontWeight:'thin',
        fontSize:12,
        marginBottom:7,
        lineHeight:17,
    },
    button : {
        backgroundColor: '#4E869D',
        paddingHorizontal:60,
        paddingVertical:15,
        borderRadius:50,
        marginTop:20,
    },
    buttonText : {
        color:'white',
        fontWeight:'bold',
        fontSize:15,
        textAlign:'center',
    },
});

export default Welcome;
