import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CustomPager from '../components/CustomPager';
import CustomHeader from '../components/CustomHeader';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function ListeScreen() {
    const db = SQLite.openDatabase('example.db');
    const [liste, setListe] = useState([]);

    const images = {
        flag1: require('../assets/flags/1.png'),
        flag2: require('../assets/flags/2.png'),
        flag3: require('../assets/flags/3.png'),
        flag4: require('../assets/flags/4.png'),
        flag5: require('../assets/flags/5.png'),
        flag6: require('../assets/flags/6.png'),
        flag7: require('../assets/flags/7.png'),
        flag8: require('../assets/flags/8.png'),
        flag9: require('../assets/flags/9.png'),
        flag10: require('../assets/flags/10.png'),
        flag11: require('../assets/flags/11.png'),
        flag12: require('../assets/flags/12.png'),
        flag13: require('../assets/flags/13.png'),
        flag14: require('../assets/flags/14.png'),
        flag15: require('../assets/flags/15.png'),
        flag16: require('../assets/flags/16.png'),
        flag17: require('../assets/flags/17.png'),
        flag18: require('../assets/flags/18.png'),
        flag19: require('../assets/flags/19.png'),
        flag20: require('../assets/flags/20.png'),
        flag21: require('../assets/flags/21.png'),
        flag22: require('../assets/flags/22.png'),
        flag23: require('../assets/flags/23.png'),
        flag24: require('../assets/flags/24.png'),
        flag25: require('../assets/flags/25.png'),
        flag26: require('../assets/flags/26.png'),
        flag27: require('../assets/flags/27.png'),
        flag28: require('../assets/flags/28.png'),
        flag29: require('../assets/flags/29.png'),
        flag30: require('../assets/flags/30.png'),
        flag31: require('../assets/flags/31.png'),
        flag32: require('../assets/flags/32.png'),
        flag33: require('../assets/flags/33.png'),
        flag34: require('../assets/flags/34.png'),
        flag35: require('../assets/flags/35.png'),
        flag36: require('../assets/flags/36.png'),
        flag37: require('../assets/flags/37.png'),
        flag38: require('../assets/flags/38.png'),
        flag39: require('../assets/flags/39.png'),
        flag40: require('../assets/flags/40.png'),
        flag41: require('../assets/flags/41.png'),
        flag42: require('../assets/flags/42.png'),
        flag43: require('../assets/flags/43.png'),
        flag44: require('../assets/flags/44.png'),
        flag45: require('../assets/flags/45.png'),
        flag46: require('../assets/flags/46.png'),
        flag47: require('../assets/flags/47.png'),
        flag48: require('../assets/flags/48.png'),
        flag49: require('../assets/flags/49.png'),
        flag50: require('../assets/flags/50.png'),
        flag51: require('../assets/flags/51.png'),
        flag52: require('../assets/flags/52.png'),
        flag53: require('../assets/flags/53.png'),
        flag54: require('../assets/flags/54.png'),
        flag55: require('../assets/flags/55.png'),
        flag56: require('../assets/flags/56.png'),
        flag57: require('../assets/flags/57.png'),
        flag58: require('../assets/flags/58.png'),
        flag59: require('../assets/flags/59.png'),
        flag60: require('../assets/flags/60.png'),
        flag61: require('../assets/flags/61.png'),
        flag62: require('../assets/flags/62.png'),
        flag63: require('../assets/flags/63.png'),
        flag64: require('../assets/flags/64.png'),
        flag65: require('../assets/flags/65.png'),
        flag66: require('../assets/flags/66.png'),
        flag67: require('../assets/flags/67.png'),
        flag68: require('../assets/flags/68.png'),
        flag69: require('../assets/flags/69.png'),
        flag70: require('../assets/flags/70.png'),
        flag71: require('../assets/flags/71.png'),
        flag72: require('../assets/flags/72.png'),
        flag73: require('../assets/flags/73.png'),
        flag74: require('../assets/flags/74.png'),
        flag75: require('../assets/flags/75.png'),
        flag76: require('../assets/flags/76.png'),
        flag77: require('../assets/flags/77.png'),
        flag78: require('../assets/flags/78.png'),
        flag79: require('../assets/flags/79.png'),
        flag80: require('../assets/flags/80.png'),
        flag81: require('../assets/flags/81.png'),
        flag82: require('../assets/flags/82.png'),
        flag83: require('../assets/flags/83.png'),
        flag84: require('../assets/flags/84.png'),
        flag85: require('../assets/flags/85.png'),
        flag86: require('../assets/flags/86.png'),
        flag87: require('../assets/flags/87.png'),
        flag88: require('../assets/flags/88.png'),
        flag89: require('../assets/flags/89.png'),
        flag90: require('../assets/flags/90.png'),
        flag91: require('../assets/flags/91.png'),
        flag92: require('../assets/flags/92.png'),
        flag93: require('../assets/flags/93.png'),
        flag94: require('../assets/flags/94.png'),
        flag95: require('../assets/flags/95.png'),
        flag971: require('../assets/flags/971.png'),
        flag972: require('../assets/flags/972.png'),
        flag973: require('../assets/flags/973.png'),
        flag974: require('../assets/flags/974.png'),
        flag976: require('../assets/flags/976.png'),
    };

    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM departements',
            [],
            (txObj, resultSet) => {
                //console.log(resultSet.rows._array);
                setListe(resultSet.rows._array);
            },
            (txObj, error) => console.log(error)
        )
    });

    return (
        <View style={styles.container}>
           
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <CustomHeader></CustomHeader>
                <View style={styles.liste}>
                    {liste.map((item, index) => (
                        <View style={styles.itemContainer} key={item.id}>
                            <Text style={styles.item}>{item.numero} - {item.nom}</Text>
                        </View>
                    ))}
                </View>               
            </ScrollView>
        
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#10B4A4',
        width: "100%", 
    },
    scrollContainer: {
        width: "100%", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",       
    },
    liste:{
        width: "90%",
        marginTop: 40,
        backgroundColor: '#f8f4fc',
        fontSize: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 20,
    },
    item:{
        fontSize: 17,
        width: "100%",
        padding: 10,
    },
    itemContainer: {
        marginTop: 10,
        width: "95%",
        backgroundColor: '#FFF',
        //elevation -> android, ios -> ???
        elevation: 5,
        borderRadius: 10,
    },
});

