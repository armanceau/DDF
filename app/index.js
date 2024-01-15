import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/Button';

const IndexScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        label = "Numéro"
        style={styles.button}
        link = "Numero"
        onPress={() => navigation.navigate('Numero')}
      >
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B4A4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IndexScreen;
