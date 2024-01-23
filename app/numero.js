import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function App() {
  const db = SQLite.openDatabase('example.db');
  const [isLoading, setIsLoading] = useState(true);
  const [departements, setDepartements] = useState([]);
  const [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      // Création de la table
      tx.executeSql(
        "CREATE TABLE departements (id INTEGER PRIMARY KEY AUTOINCREMENT, numero INTEGER, nom TEXT)",
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
                  "INSERT INTO departements (numero, nom) VALUES (?, ?), (?, ?), (?, ?), (?, ?)",
                  [1, 'Ain', 2, 'Aisne', 3, 'Allier', 6, 'Alpes-Maritimes'],
                  (txObj, resultSet) => {
                    // Vous pouvez ajouter d'autres transactions d'insertion si nécessaire
                  },
                  (txObj, error) => console.log(error)
                );
              } else {
                // La table n'est pas vide, vous pouvez effectuer une action différente si nécessaire
              }
            },
            (txObj, error) => console.log(error)
          );
        },
        //(txObj, error) => console.log(error)
      );
    });
  
    // Récupération des données
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM departements',
        [],
        (txObj, resultSet) => {
          const rows = resultSet.rows._array;
          const updatedDepartements = rows.map((departement) => {
            return { id: departement.id, numero: departement.numero, nom: departement.nom };
          });
          setDepartements(updatedDepartements);
        },
        (txObj, error) => console.log(error)
      );
    });
  
    loadRandomQuestion();
    setIsLoading(false);
  }, []);

  const loadRandomQuestion = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM departements',
        [],
        (txObj, resultSet) => {
          const rowCount = resultSet.rows.item(0).count;
          const randomIndex = Math.floor(Math.random() * rowCount) + 1;

          txObj.executeSql(
            'SELECT * FROM departements WHERE id = ?',
            [randomIndex],
            (txObj, resultSet) => {
              const randomQuestion = resultSet.rows.item(0);
              setQuestion(randomQuestion);
              setOptions(generateRandomOptions(randomQuestion));
            },
            (txObj, error) => console.log(error)
          );
        },
        (txObj, error) => console.log(error+"test")
      );
    });
  }; 

  const generateRandomOptions = (correctAnswer) => {
    const options = [correctAnswer.nom];
    const incorrectOptions = getIncorrectOptions(correctAnswer);
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
      const randomIncorrectOption = incorrectOptions.splice(randomIndex, 1)[0];
      options.push(randomIncorrectOption.nom);
    }
    return shuffleArray(options);
  };

  const getIncorrectOptions = (correctAnswer) => {
    return departements.filter((departement) => departement.id !== correctAnswer.id);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleAnswer = (selectedOption) => {
    setTotalQuestions(totalQuestions + 1);

    // Vérifier si la réponse est correcte en comparant avec la réponse correcte stockée dans la base de données
    if (selectedOption === question.nom) {
      console.log('Bonne réponse!');
      setScore(score + 1);
    } else {
      console.log('Mauvaise réponsee!');
    }

    // Charger une nouvelle question aléatoires
    loadRandomQuestion();
  };
  
  const showOptions = () => {
    return options.map((option, index) => (
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={[
            styles.optionBtn,
            option === question.nom ? styles.correctOption : styles.incorrectOption,
          ]} key={index} onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      </View>
      
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numero}>{question.numero}</Text>
      <View style={styles.containerScore}>
        <Text style={styles.score}>{score}/{totalQuestions}</Text>
      </View>
      {showOptions()}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B4A4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8,
  },
  containerScore: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 10,
    width: 50,
    padding: 10,
    backgroundColor: "#00C7B3",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numero: {
    fontSize: 80,
    color: '#FFF',
  },
  optionBtn: {
    borderRadius: 20,
    width: 250,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F8945C',
    padding: 10,
    borderWidth: 3,
    borderColor: "#00C7B3",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  score: {
    color: '#FFF',
  },
  // correctOption: {
  //   backgroundColor: '#8BC34A', // Couleur verte pour la réponse correcte
  // },
  // incorrectOption: {
  //   backgroundColor: '#F8945C', // Couleur rouge pour les réponses incorrectes
  // },
  optionText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
