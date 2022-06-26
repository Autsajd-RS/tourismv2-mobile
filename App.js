import { StyleSheet, LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Maps from './screens/Maps';
import Menu from './screens/Menu';
import History from './screens/History';
import SingleDestination from './screens/SingleDestination';


const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs([
    'Invalid prop `textStyle` of type `array` supplied to `Cell`'
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="SingleDestination" component={SingleDestination} />
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
