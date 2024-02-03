import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import CustomModal from '../components/CustomModal';
import CustomButton from '../components/CustomButton';



export default function App() {
  const db = SQLite.openDatabase('example.db');
  const [isLoading, setIsLoading] = useState(true);
  const [departements, setDepartements] = useState([]);
  const [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(['❤️','❤️','❤️' ]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {

      tx.executeSql(
        'SELECT * FROM departements',
        [],
        (txObj, resultSet) => {
            setAllOptions(resultSet.rows._array);
            setAvailableOptions([...resultSet.rows._array]);
        },
        (txObj, error) => console.log(error)
      )
  });
  
    //loadRandomQuestion();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(allOptions.length > 0 && allOptions.length == availableOptions.length){
      loadRandomQuestion();
    }
  }, [allOptions, availableOptions]);

  const loadRandomQuestion = () => {
    let options2 = [];
    
    questionIndex = Math.floor(Math.random() * availableOptions.length);

    while(options2.length < 3){
      optIndex = Math.floor(Math.random() * allOptions.length);
      let good = true;
      
      if(allOptions[optIndex]["numero"] == availableOptions[questionIndex]["numero"]){
        good= false; 
      }  
    
      for (let opt of options2) {
        if (opt['numero'] == allOptions[optIndex]['numero']) {good = false; break;}
      }
      if (good) {
        options2.push(allOptions[optIndex])
      }
    }

    let question = availableOptions.splice(questionIndex, 1);
    
    insertIndex = Math.floor(Math.random() * 4);
    options2.splice(insertIndex, 0, question[0])

    setQuestion(question[0]);
    setOptions(options2);   
  }; 

  const getIncorrectOptions = (correctAnswer) => {
    return departements.filter((departement) => departement.id !== correctAnswer.id);
  };

  const handleAnswer = (selectedOption) => {
    setTotalQuestions(totalQuestions + 1);
  
    // Vérifier si la réponse est correcte en comparant avec la réponse correcte stockée dans la base de données
    if (selectedOption.nom === question.nom) {
      console.log('Bonne réponse!');
      setScore(score + 1);
      setSelectedStyle('correctOption');
    } else {
      console.log('Mauvaise réponse!');
      life.splice(0,1);
      setSelectedStyle('incorrectOption');
    }


  
    setTimeout(() => {
      // Charger une nouvelle question aléatoire
      loadRandomQuestion();
      // Réinitialisez l'état du style après le chargement de la nouvelle question
      setSelectedStyle(null);
    }, 500);
  };  

  if ((availableOptions.length === 0) || (life.length === 0)) {
    let additionalContent = null;

    if (score <= 45) {
      additionalContent = 
        <View style={styles.Imagecontainer}>
          <Image
            style={styles.image}
            source={require("../assets/score-45.png")} 
          />
        </View>;
    }
    else if (score > 45 && score <= 75) {
      additionalContent = 
        <View style={styles.Imagecontainer}>
          <Image
            style={styles.image}
            source={require("../assets/score-75.png")} 
          />
        </View>;
    }
    else if (score >= 92) {
      additionalContent = 
        <View style={styles.Imagecontainer}>
          <Image
            style={styles.image}
            source={require("../assets/score-90.png")} 
          />
        </View>;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.scoreFinalTitle}>Fin de partie</Text>
        <Text style={styles.scoreFinal}>Score : {score}/99</Text>
        {additionalContent}
        
        <CustomButton label="Rejouer" link="Numero" navigation={navigation} />
        <CustomButton label="Menu" link="Index" navigation={navigation}/>
        <StatusBar style="auto" />
      </View>
    );
  } 
  else 
  { 
    return (
      <View style={styles.container}>
        <Text style={styles.numero}>{question.numero}</Text>
        <View style={styles.containerScore}>
          <Text style={styles.score}>{score}/{totalQuestions}</Text>
        </View>
        <View style={styles.containerLife}>
          <Text style={styles.life}>{life}</Text>
        </View>

        <CustomModal text="Devinez un maximum de départements selon leur numéro. Vous avez 3 vies indiquées par les coeurs en haut à droite."></CustomModal>
        
        {
          options.map((option, index) => (
            <View key={index} style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  selectedStyle === 'correctOption' && option.nom === question.nom ? styles.correctOption : null,
                  selectedStyle === 'incorrectOption' && option.nom === question.nom ? styles.incorrectOption : null,
                ]}
                key={index}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option.nom}</Text>
              </TouchableOpacity>
            </View>
          ))
        }


        <StatusBar style="auto" />
      </View>
    );
  }
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
  Imagecontainer: {
    width: "70%",
    height: "50%",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
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
    left: 0,
    top: 0,
    borderRadius: 10,
    width: 60,
    padding: 10,
    backgroundColor: "#00C7B3",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLife: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 10,
    width: "fit-content",
    padding: 10,
    backgroundColor: "#00C7B3",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: "90%",
    resizeMode: "cover",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#00C7B3",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  scoreFinal: {
    color: '#FFF',
    fontSize: 25,
  },
  scoreFinalTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  correctOption: {
    backgroundColor: '#8BC34A', // Couleur verte pour la réponse correcte
  },
  incorrectOption: {
    backgroundColor: '#F8945C', // Couleur rouge pour les réponses incorrectes
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
