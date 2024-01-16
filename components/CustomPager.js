import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import CustomImage from './CustomImage';
import Button from './Button';

export default function CustomPager() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <CustomImage source={require("../assets/numeros.png")} /> 
          <Button label="Numéro" link="Numero" navigation={navigation} />
        </View>
        <View style={styles.page} key="2">
          <CustomImage source={require("../assets/drapeaux.png")} /> 
          <Button label="Drapeau" link="Numero" navigation={navigation} />
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
