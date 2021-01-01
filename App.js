import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
  <View style={styles.container}>
   <Text style={[styles.setFontSize,styles.setColorWhite]}>Home Screen</Text>
    <Text style={[styles.setFontSize,styles.setColorWhite]}>Hello there!</Text> 
    <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> 
        <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      /> 
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
      title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      /> 
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
      title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      /> 
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: '#f44336',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setFontSize: {
    fontSize: 15,
    fontWeight : 'bold' 
  },
  setColorWhite : {
    color: '#ffffff'
  },
  setColorRed : {
    color: '#f44336'
  },
  setColorPink :{
    color: '#e91e63'
  },
  setColorPurple :{
    color: '#9c27b0'
  },
  setColorBlue :{
    color: '#2196f3'
  },
});
