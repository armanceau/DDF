import { StyleSheet, View, Pressable, TouchableOpacity, Text, onPress } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({label, link, onPress }){
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => onPress(link)}
        >
          <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
      width: 320,
      height: 68,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    button: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#F8945C',
      borderRadius: 10,
      padding: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
    },
  });