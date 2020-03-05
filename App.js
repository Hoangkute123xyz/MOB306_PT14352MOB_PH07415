import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './Screen/HomeScreen'
import { Login } from './Screen/LoginScreen';
import { Story } from './Screen/StoryScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ animationTypeForReplace: "pop", headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ animationTypeForReplace: "pop", headerShown: false }} />
        <Stack.Screen
          name="Story"
          component={Story}
          options={{ animationTypeForReplace: "pop", headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
