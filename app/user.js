import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';


export default function UserScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Logique de connexion ici
        console.log('Connexion avec:', email, password);
        // Naviguer vers l'écran suivant après la connexion réussie
        // navigation.navigate('EcranSuivant');
    };

    const handleSignUp = () => {
        // Logique d'inscription ici
        console.log('Inscription avec:', email, password);
        // Naviguer vers l'écran suivant après l'inscription réussie
        // navigation.navigate('EcranSuivant');
    };

    return (
        <View contentContainerStyle={styles.container}>
          <Text>Bienvenue sur la page d'inscription/connexion</Text>
    
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Adresse e-mail"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
    
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text>Connexion</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text>Inscription</Text>
          </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      inputContainer: {
        width: '100%',
        marginBottom: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
      },
});

