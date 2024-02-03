import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomPager from '../components/CustomPager';
import CustomHeader from '../components/CustomHeader';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

const IndexScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'CabinSketch': require('../assets/fonts/CabinSketch-Regular.ttf'),
    'Fredoka': require('../assets/fonts/Fredoka-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[{ flex: 1 }, styles.container]}>
      <CustomHeader></CustomHeader>

      <CustomPager></CustomPager>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B4A4',
    justifyContent: 'center',
  },
  header:{
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageHeader: {
    width: 70,
    height: 70,
  },
  titleHeader:{
    fontWeight: "bold",
    fontSize: 30,
    width: "60%",
    textAlign: "center",
    color: "#fff",
    fontFamily: "CabinSketch",
  }
});

export default IndexScreen;
