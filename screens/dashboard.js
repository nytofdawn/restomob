import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../navigation/layout';
import { fetchFoodItems } from '../middle/middle'; // Import the fetch function from api.js

const Dashboard = ({ navigation }) => {
  const [items, setItems] = useState([]);  // State to hold fetched items
  const [loading, setLoading] = useState(true);  // State to manage the loading indicator

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getItems = async () => {
        try {
          const fetchedItems = await fetchFoodItems();  // Call the API function
          setItems(fetchedItems);  // Update the state with the fetched data
        } catch (error) {
          console.error('Error fetching items:', error);
          Alert.alert('Error', 'Failed to fetch food items');
        } finally {
          setLoading(false);  // Stop loading animation once the fetch is done
        }
      };

      getItems();  // Call the function to fetch items
    }, 3000); // 3000ms = 3 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout navigation={navigation} activeTab="Home">
      <LinearGradient colors={['#b2bd60', '#fdbb2d']} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.text}>Welcome to the Dashboard!</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#6200EE" />
          ) : (
            <View style={styles.itemsContainer}>
              {items.length === 0 ? (
                <Text style={styles.text}>No items available</Text>
              ) : (
                items.map((item, index) => (
                  <View key={index} style={styles.itemCard}>
                    <Text style={styles.itemText}>Item: {item.name}</Text>
                    <Text style={styles.itemText}>Price: {item.price}</Text>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  itemsContainer: {
    width: '100%',
    marginTop: 20,
  },
  itemCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Dashboard;
