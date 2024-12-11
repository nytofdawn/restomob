import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../navigation/layout';
import { fetchTables } from '../middle/middle';  // Import the fetchTables function from api.js

const ReservationScreen = ({ navigation }) => {
  const [tables, setTables] = useState([]);  // State to hold table data
  const [loading, setLoading] = useState(true);  // State to manage loading state

  useEffect(() => {
    const getTables = async () => {
      try {
        console.log('Fetching data...');
        const fetchedTables = await fetchTables();  // Use fetchTables from api.js
        console.log('Fetched tables:', fetchedTables);
        setTables(fetchedTables);  // Update state with fetched tables
      } catch (error) {
        console.error('Error fetching tables:', error);
        Alert.alert('Error', 'Failed to fetch table data');
      } finally {
        setLoading(false);  // Stop loading animation once the fetch is done
      }
    };
    getTables();  // Call the function to fetch table data
  }, []);

  return (
    <Layout navigation={navigation} activeTab="Reservation">
      <LinearGradient colors={['#b2bd60', '#fdbb2d']} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.text}>RESERVE AND ORDER</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#6200EE" />
          ) : (
            <View style={styles.tablesContainer}>
              {tables.length === 0 ? (
                <Text style={styles.text}>No tables available</Text>
              ) : (
                tables.map((table) => (
                  <View key={table._id} style={styles.tableCard}>
                    <Text style={styles.tableText}>Table Number: {table.table_number}</Text>
                    <Text style={styles.tableText}>Available: {table.available ? 'Yes' : 'No'}</Text>
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
  tablesContainer: {
    width: '100%',
    marginTop: 20,
  },
  tableCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ReservationScreen;
