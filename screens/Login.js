// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { login } from '../middle/middle';  // Import login function
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing token

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const normalizeEmail = (emailInput) => {
    return emailInput.trim().toLowerCase();
  };

  const handleLogin = async () => {
    const normalizedEmail = normalizeEmail(email);

    try {
      // Send login request to server
      const response = await login({ email: normalizedEmail, password });

      if (response.status === 'success') {
        // Store token in AsyncStorage
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user))

        Alert.alert('Success', response.message);
        navigation.navigate('Dashboard'); // Navigate to the dashboard after login
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <LinearGradient colors={['#2E1A47', '#8B3A62']} style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <Button title="Login" onPress={handleLogin} />
        
        <Text style={styles.switchText}>
          Don't have an account? {' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
            Sign up here
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  loginContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'black',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
