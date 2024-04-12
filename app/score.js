import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


export default function ScoreScreen() {
    const db = SQLite.openDatabase('example.db');
    const [score, setScore] = useState([]);
    const navigation = useNavigation();

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
    
    let additionalContent = null;

    return (
        <View style={styles.container}>
            {score.map((item) => {
                let additionalContent;
        
                //Choix du lien de l'image selon la catégorie :
                if (item.categorie_score === 'numeros') {
                    additionalContent = (
                        <Image
                            style={styles.image}
                            source={require("../assets/numeros.png")}
                        />
                    );
                } else if (item.categorie_score === 'drapeaux') {
                    additionalContent = (
                        <Image
                            style={styles.image}
                            source={require("../assets/drapeaux.png")}
                        />
                    );
                }
        
                return (
                    <View style={styles.itemContainer}>
                        <View style={styles.left}>
                            <View>
                                <Text style={styles.title}>
                                {item.categorie_score.charAt(0).toUpperCase() + item.categorie_score.slice(1)} :
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.text}>
                                    Meilleur score : {item.best_score !== 0 ? `${item.best_score}/100` : '--/100'}
                                </Text>

                            </View>
                            <View>
                                <Text style={styles.text}>
                                    Date : {item.date_score ? item.date_score : '--/--/--'}
                                </Text>
                            </View>
                        </View>
            
                        <View style={styles.right}>
                            {additionalContent}
                        </View>
                    </View>
                );
            })}    
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
        height: 180,
        padding: 15,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#00C7B3",
        elevation: 5,
        display: "flex",
        flexDirection: "row",
        marginTop: 50,
    },
    title:{
        fontSize: 40,
        color: "#F8945C",
        fontFamily: "CabinSketch",
    },
    text:{
        fontSize: 17,
    },
    right: {
        width: "40%",
        height: "100%",
    },
    left: {
        width: "60%",
        height: "100%",
        display: "flex",
        gap: 10,
    },
    image: {
        width: "100%",
        height: "100%",
    },
      
});

