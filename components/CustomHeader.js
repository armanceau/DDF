import React from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import CustomButtonImage from './CustomButtonImage';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <Image
            style={styles.imageHeader}
            source={require("../assets/icon.png")}
            contentFit="cover"
            transition={1000}
            />

            <Text style={styles.titleHeader}>DEPARTEMENTS DE FRANCE</Text>

            <CustomButtonImage 
            source={require("../assets/trophy.png")}
            contentFit="cover"
            transition={1000}
            link="Score" navigation={navigation}
            />
        </View>
    );
}

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
        justifyContent: "center",
        marginTop: 50,
    },
    imageHeader: {
        position: "absolute",
        left: 0,
        top: 0,
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
