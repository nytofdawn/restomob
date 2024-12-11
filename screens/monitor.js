import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';  // Import the QR Code package

const MonitoringScreen = ({ route, navigation }) => {
  const [reservationData, setReservationData] = useState(null);

  // Extract the reservation data passed from the ReservationScreen
  useEffect(() => {
    if (route.params && route.params.reservationData) {
      setReservationData(route.params.reservationData);
    }
  }, [route.params]);

  // Handle back to the reservation screen
  const handleBack = () => {
    navigation.goBack();
  };

  if (!reservationData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Create a string to encode into the QR code
  const reservationInfo = JSON.stringify({
    table: reservationData.table,  // Table number and capacity
    foodItems: reservationData.foodItems.map(item => item.name),  // Food item names
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservation Confirmed</Text>

      <Text style={styles.info}>
        Table: {reservationData.table.table_number} (Capacity: {reservationData.table.capacity})
      </Text>
      
      <Text style={styles.info}>Food Items Selected:</Text>
      {reservationData.foodItems.map((item, index) => (
        <Text key={index} style={styles.item}>
          {item.name} - ${item.price}
        </Text>
      ))}

      {/* QR Code Component */}
      <View style={styles.qrContainer}>
        <QRCode value={reservationInfo} size={200} />
      </View>

      <Button title="Back to Reservation" onPress={handleBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  item: {
    fontSize: 14,
    color: '#555',
  },
  qrContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MonitoringScreen;
