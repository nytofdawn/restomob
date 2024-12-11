import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/signup';
import DashboardScreen from './screens/dashboard';
import ReservationScreen from './screens/reservation';
import MonitoringScreen from './screens/monitor';
import Profile from './screens/profile';
import BeginScreen from './screens/Beginscreen';

const Stack = createStackNavigator();

const customTransition = {
  gestureEnabled: true,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    const translateX = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.width, 0],
      easing: Easing.out(Easing.cubic),  
    });

    return {
      cardStyle: {
        transform: [
          {
            translateX,
          },
        ],
      },
    };
  },
};

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Begin"
          screenOptions={{
            headerShown: false,
            customTransition,
          }}
        >
        <Stack.Screen name="Begin" component={BeginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />
        <Stack.Screen name="Monitoring" component={MonitoringScreen} />
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
