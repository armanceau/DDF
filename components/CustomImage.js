import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function CustomImage({ source }) {
  return (
    <View style={styles.Imagecontainer}>
      <Image
        style={styles.image}
        source={source} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
    Imagecontainer: {
    width: "80%",
    height: "50%",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    backgroundColor: "#F5F7F7",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#00C7B3",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "90%",
    height: "80%",
    resizeMode: "cover",
  },
});
