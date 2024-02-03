import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
            <CustomHeader></CustomHeader>
            <View>
                <Text>Contenu de la liste :</Text>
                {liste.map((item) => (
                <Text key={item.id}>{item.numero} - {item.nom}</Text>
                ))}
            </View>
        
            <StatusBar style="auto" />
        </View>
      );



};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#10B4A4',
        justifyContent: 'center',
    },
});

