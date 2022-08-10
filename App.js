import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/screens/Home';
import BookLocation from './components/screens/BookLocation';
import Direction from './components/screens/Direction'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="home" component={Home}/>
      <Stack.Screen name="book" component={BookLocation}/>
      <Stack.Screen name="direction" component={Direction}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
