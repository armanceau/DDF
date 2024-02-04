import React from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';

export default function CustomButtonImage({ source, link, navigation }) {
  const handlePress = () => {
    navigation.navigate(link);
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Image
            style={styles.image}
            source={source} 
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 50,
    height: 58,
    position: "absolute",
    right: 10,
    top: 10,
  },
  image:{
    width: "100%",
    height: "100%"
  },
});
