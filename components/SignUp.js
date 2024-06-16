import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../config/authFunctions';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (fullName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      Alert.alert('Input Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    const user = await registerUser(fullName, email, password); // Pass fullName to registerUser
    if (user) {
      Alert.alert('Registration Success', 'Welcome!');
      navigation.navigate('Login');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>Create a New Account</Text>

          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                autoCapitalize="words"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

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

            <View style={styles.formGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupButtonText}>Login</Text>
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
    paddingTop: 60, // Adjust this value to provide spacing from the top
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
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  signupText: {
    color: '#888B94',
    marginBottom: 10,
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

export default SignUp;
