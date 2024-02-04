import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';


export default function UserScreen() {
    const db = SQLite.openDatabase('example.db');
    const [score, setScore] = useState([]);

    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM score',
            [],
            (txObj, resultSet) => {
                //console.log(resultSet.rows._array);
                setScore(resultSet.rows._array);
            },
            (txObj, error) => console.log(error)
        )
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meilleurs scores</Text>
            <View style={styles.score}>
                {score.map((item) => (
                    <View style={styles.itemContainer} key={item.id}>
                        <Text style={styles.item}>{item.best_score}, {item.date_score}, {item.date_score}, {item.categorie_score}</Text>
                    </View>
                ))}
            </View>               

        
            <StatusBar style="auto" />
        </View>
    );
  
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#10B4A4',
        width: "100%", 
        height: "100%",
    },
    title:{
        fontSize: 30,   
    }
      
});

