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

