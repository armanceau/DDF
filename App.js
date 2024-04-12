import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NumeroScreen from './app/numero';
import DrapeauScreen from './app/drapeau';
import IndexScreen from './app/index';
import ListeScreen from './app/liste';
import ScoreScreen from './app/score';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Numero" component={NumeroScreen} options={{ title: 'Numéro de département' }}/>
        <Stack.Screen name="Drapeau" component={DrapeauScreen} options={{ title: 'Drapeau de département' }}/>
        <Stack.Screen name="Index" component={IndexScreen}  options={{ headerTitle: null }} />
        <Stack.Screen name="Liste" component={ListeScreen}  options={{ title: 'Liste des départements' }}/>
        <Stack.Screen name="Score" component={ScoreScreen}  options={{ title: 'Meilleurs scores' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
