import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';


export default function ScoreScreen() {
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
           

            {score.map((item) => (
                pathImage = "../assets/" + item.categorie_score.toLowerCase() + ".png", 
                <View style={styles.itemContainer} key={item.id}>
                    <View style={styles.left}>
                        <View>
                            <Text style={styles.title}>{item.categorie_score.charAt(0).toUpperCase() + item.categorie_score.slice(1)} :</Text>
                        </View>
                        <View style={styles.number}>
                            <Text>Meilleur score : {item.best_score}/100</Text>
                        </View>
                        <View style={styles.number}>
                            <Text>Date : {item.date_score}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.right}>
                        <Image
                            style={styles.image}
                            source={require(pathImage)} 
                        />
                    </View>
                    
                </View>
            ))}
              

        
            <StatusBar style="auto" />
        </View>
    );
  
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#10B4A4',
        width: "100%", 
        height: "100%",
        display: "flex",
        alignItems: 'center',
    },
    itemContainer:{
        marginTop: 40,
        backgroundColor: '#FFF',
        width: "90%", 
        padding: 15,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#00C7B3",
        elevation: 5,
    },
    title:{
        fontSize: 40,
        color: "#F8945C",
        fontFamily: "CabinSketch",
    },
      
});

