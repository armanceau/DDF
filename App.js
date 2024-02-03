import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NumeroScreen from './app/numero';
import IndexScreen from './app/index';
import ListeScreen from './app/liste';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Numero" component={NumeroScreen} />
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Liste" component={ListeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
