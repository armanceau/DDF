import React from 'react';
import { View, Text, Button } from 'react-native';

const NumeroScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Page Test 1</Text>
      <Button
        title="Aller à la page suivante"
        onPress={() => navigation.navigate("Index")}
      />
    </View>
  );
};

export default NumeroScreen;
