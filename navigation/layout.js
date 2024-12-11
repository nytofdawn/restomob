import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";

const Layout = ({ children, navigation, activeTab }) => {
  // Function to handle footer navigation
  const handleFooterPress = (destination) => {
    // Check if navigation is available and then navigate
    if (navigation) {
      navigation.navigate(destination);
    } else {
      console.error("Navigation prop is not available");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Render the dynamic content (children) */}
      <View style={styles.contentContainer}>
        {children}
      </View>

      {/* Floating Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Home' && styles.activeFooterButton]}
          onPress={() => handleFooterPress('Dashboard')}
        >
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Monitoring' && styles.activeFooterButton]}
          onPress={() => handleFooterPress('Monitoring')}
        >
          <Text style={styles.footerText}>Monitor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Reservation' && styles.activeFooterButton]}
          onPress={() => handleFooterPress('Reservation')}
        >
          <Text style={styles.footerText}>Reservation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, activeTab === 'Profile' && styles.activeFooterButton]}
          onPress={() => handleFooterPress('Profile')}
        >
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',  // Ensure content stays at the top
  },
  footer: {
    position: 'absolute',  // Fixed at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  activeFooterButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
});

export default Layout;
