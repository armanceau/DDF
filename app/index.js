import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomPager from '../components/CustomPager';
import CustomHeader from '../components/CustomHeader';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

const IndexScreen = ({ navigation }) => {
    const db = SQLite.openDatabase('example.db');
    const [isLoading, setIsLoading] = useState(true);
    
    const [fontsLoaded] = useFonts({
        'CabinSketch': require('../assets/fonts/CabinSketch-Regular.ttf'),
        'Fredoka': require('../assets/fonts/Fredoka-Regular.ttf'),
    });

    //Création table Département
    useEffect(() => {
        db.transaction((tx) => {
        // Création de la table
        tx.executeSql(
            //"DROP Table departements",
            "CREATE TABLE IF NOT EXISTS departements (id INTEGER PRIMARY KEY AUTOINCREMENT, numero INT, nom TEXT)",
            [],
            (txObj, resultSet) => {
            // Vérification si la table est vide
            txObj.executeSql(
                "SELECT COUNT(*) as count FROM departements",
                [],
                (txObj, resultSet) => {
                const rowCount = resultSet.rows.item(0).count;
    
                if (rowCount === 0) {
                    // La table est vide, effectuez l'insertion
                    txObj.executeSql(
                    "INSERT INTO departements (numero, nom) VALUES (1, 'Ain'),   (2, 'Aisne'),   (3, 'Allier'),   (4, 'Alpes-de-Haute-Provence'),   (5, 'Hautes-Alpes'),   (6, 'Alpes-Maritimes'),   (7, 'Ardèche'),   (8, 'Ardennes'),   (9, 'Ariège'),   (10, 'Aube'),   (11, 'Aude'),   (12, 'Aveyron'),   (13, 'Bouches-du-Rhône'),   (14, 'Calvados'),   (15, 'Cantal'),   (16, 'Charente'),   (17, 'Charente-Maritime'),   (18, 'Cher'),   (19, 'Corrèze'), (20, 'Corse'),  (21, 'Cote-d Or'),   (22, 'Cotes-d Armor'),   (23, 'Creuse'),   (24, 'Dordogne'),   (25, 'Doubs'),   (26, 'Drôme'),   (27, 'Eure'),   (28, 'Eure-et-Loir'),   (29, 'Finistère'),   (30, 'Gard'),   (31, 'Haute-Garonne'),   (32, 'Gers'),   (33, 'Gironde'),   (34, 'Hérault'),   (35, 'Ille-et-Vilaine'),   (36, 'Indre'),   (37, 'Indre-et-Loire'),   (38, 'Isère'),   (39, 'Jura'),   (40, 'Landes'),   (41, 'Loir-et-Cher'),   (42, 'Loire'),   (43, 'Haute-Loire'),   (44, 'Loire-Atlantique'),   (45, 'Loiret'),   (46, 'Lot'),   (47, 'Lot-et-Garonne'),   (48, 'Lozère'),   (49, 'Maine-et-Loire'),   (50, 'Manche'),   (51, 'Marne'),   (52, 'Haute-Marne'),   (53, 'Mayenne'),   (54, 'Meurthe-et-Moselle'),   (55, 'Meuse'),   (56, 'Morbihan'),   (57, 'Moselle'),   (58, 'Nievre'),   (59, 'Nord'),   (60, 'Oise'),   (61, 'Orne'),   (62, 'Pas-de-Calais'),   (63, 'Puy-de-Dôme'),   (64, 'Pyrénées-Atlantiques'),   (65, 'Hautes-Pyrénées'),   (66, 'Pyrénées-Orientales'),   (67, 'Bas-Rhin'),   (68, 'Haut-Rhin'),   (69, 'Rhône'),   (70, 'Haute-Saône'),   (71, 'Saône-et-Loire'),   (72, 'Sarthe'),   (73, 'Savoie'),   (74, 'Haute-Savoie'),   (75, 'Paris'),   (76, 'Seine-Maritime'),   (77, 'Seine-et-Marne'),   (78, 'Yvelines'),   (79, 'Deux-Sèvres'),   (80, 'Somme'),   (81, 'Tarn'),   (82, 'Tarn-et-Garonne'),   (83, 'Var'),   (84, 'Vaucluse'),   (85, 'Vendée'),   (86, 'Vienne'),   (87, 'Haute-Vienne'),   (88, 'Vosges'),   (89, 'Yonne'),   (90, 'Territoire de Belfort'),   (91, 'Essonne'),   (92, 'Hauts-de-Seine'),   (93, 'Seine-Saint-Denis'),   (94, 'Val-de-Marne'),   (95, 'Val-d''Oise'),   (971, 'Guadeloupe'),   (972, 'Martinique'),   (973, 'Guyane'),   (974, 'La Reunion'),   (976, 'Mayotte')",
                    (txObj, resultSet) => {
                        // Vous pouvez ajouter d'autres transactions d'insertion si nécessaire
                    },
                    (txObj, error) => console.log(error)
                    );
                }
                },
                (txObj, error) => console.log(error)
            );
            },
            (txObj, error) => console.log(error)
        );
        });
    
        //loadRandomQuestion();
        setIsLoading(false);
    }, []);

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
