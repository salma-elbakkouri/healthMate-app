import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser, forgotPassword } from '../config/authFunctions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Input Error', 'Email and password fields cannot be empty.');
      return;
    }

    const user = await loginUser(email, password);
    if (user) {
      Alert.alert('Login Success', 'Welcome back!');
      navigation.navigate('Home');
    }
  };

  const handleForgotPassword = async () => {
    if (email) {
      await forgotPassword(email);
    } else {
      Alert.alert('Forgot Password', 'Please enter your email address first.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>Please Login to continue</Text>

          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
              <Text style={styles.submitButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60, // Add padding to ensure spacing from the top
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
    color: '#000',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 70,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 24,
  },
  formGroup: {
    position: 'relative',
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    fontSize: 14,
    color: '#737373',
    zIndex: 1,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 45,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    borderRadius: 35,
    width: '100%',
    backgroundColor: '#fff',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#888B94',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#4D869C',
    borderRadius: 35,
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  signupContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  signupText: {
    color: '#888B94',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: 'white',
    borderColor: '#4D869C',
    borderWidth: 1,
    borderRadius: 35,
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#4D869C',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default Login;
