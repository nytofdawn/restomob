import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const BeginScreen = ({ navigation }) => {
  

  const handleNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E1A47', '#8B3A62']} 
        style={styles.gradient}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Restaurant Reservation Management System</Text>
          <Image source={require('./logo/hackir.jpg')} style={styles.logo} />
    
          <TouchableOpacity style={styles.navigationButton} onPress={handleNavigation}>
            <Text style={styles.navigationButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width:'100%',
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontStyle: 'italic',
    color: '#fff',  
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius:100,
    marginBottom: 20,
  },
  navigationButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#1C2841',
  },
  navigationButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BeginScreen;
