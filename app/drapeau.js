import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import CustomModal from '../components/CustomModal';
import CustomButton from '../components/CustomButton';

export default function DrapeauScreen() {
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

  console.log("hello drapeau");

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


  const images = {
    flag1: require('../assets/flags/1.png'),
    flag2: require('../assets/flags/2.png'),
    flag3: require('../assets/flags/3.png'),
    flag4: require('../assets/flags/4.png'),
    flag5: require('../assets/flags/5.png'),
    flag6: require('../assets/flags/6.png'),
    flag7: require('../assets/flags/7.png'),
    flag8: require('../assets/flags/8.png'),
    flag9: require('../assets/flags/9.png'),
    flag10: require('../assets/flags/10.png'),
    flag11: require('../assets/flags/11.png'),
    flag12: require('../assets/flags/12.png'),
    flag13: require('../assets/flags/13.png'),
    flag14: require('../assets/flags/14.png'),
    flag15: require('../assets/flags/15.png'),
    flag16: require('../assets/flags/16.png'),
    flag17: require('../assets/flags/17.png'),
    flag18: require('../assets/flags/18.png'),
    flag19: require('../assets/flags/19.png'),
    flag20: require('../assets/flags/20.png'),
    flag21: require('../assets/flags/21.png'),
    flag22: require('../assets/flags/22.png'),
    flag23: require('../assets/flags/23.png'),
    flag24: require('../assets/flags/24.png'),
    flag25: require('../assets/flags/25.png'),
    flag26: require('../assets/flags/26.png'),
    flag27: require('../assets/flags/27.png'),
    flag28: require('../assets/flags/28.png'),
    flag29: require('../assets/flags/29.png'),
    flag30: require('../assets/flags/30.png'),
    flag31: require('../assets/flags/31.png'),
    flag32: require('../assets/flags/32.png'),
    flag33: require('../assets/flags/33.png'),
    flag34: require('../assets/flags/34.png'),
    flag35: require('../assets/flags/35.png'),
    flag36: require('../assets/flags/36.png'),
    flag37: require('../assets/flags/37.png'),
    flag38: require('../assets/flags/38.png'),
    flag39: require('../assets/flags/39.png'),
    flag40: require('../assets/flags/40.png'),
    flag41: require('../assets/flags/41.png'),
    flag42: require('../assets/flags/42.png'),
    flag43: require('../assets/flags/43.png'),
    flag44: require('../assets/flags/44.png'),
    flag45: require('../assets/flags/45.png'),
    flag46: require('../assets/flags/46.png'),
    flag47: require('../assets/flags/47.png'),
    flag48: require('../assets/flags/48.png'),
    flag49: require('../assets/flags/49.png'),
    flag50: require('../assets/flags/50.png'),
    flag51: require('../assets/flags/51.png'),
    flag52: require('../assets/flags/52.png'),
    flag53: require('../assets/flags/53.png'),
    flag54: require('../assets/flags/54.png'),
    flag55: require('../assets/flags/55.png'),
    flag56: require('../assets/flags/56.png'),
    flag57: require('../assets/flags/57.png'),
    flag58: require('../assets/flags/58.png'),
    flag59: require('../assets/flags/59.png'),
    flag60: require('../assets/flags/60.png'),
    flag61: require('../assets/flags/61.png'),
    flag62: require('../assets/flags/62.png'),
    flag63: require('../assets/flags/63.png'),
    flag64: require('../assets/flags/64.png'),
    flag65: require('../assets/flags/65.png'),
    flag66: require('../assets/flags/66.png'),
    flag67: require('../assets/flags/67.png'),
    flag68: require('../assets/flags/68.png'),
    flag69: require('../assets/flags/69.png'),
    flag70: require('../assets/flags/70.png'),
    flag71: require('../assets/flags/71.png'),
    flag72: require('../assets/flags/72.png'),
    flag73: require('../assets/flags/73.png'),
    flag74: require('../assets/flags/74.png'),
    flag75: require('../assets/flags/75.png'),
    flag76: require('../assets/flags/76.png'),
    flag77: require('../assets/flags/77.png'),
    flag78: require('../assets/flags/78.png'),
    flag79: require('../assets/flags/79.png'),
    flag80: require('../assets/flags/80.png'),
    flag81: require('../assets/flags/81.png'),
    flag82: require('../assets/flags/82.png'),
    flag83: require('../assets/flags/83.png'),
    flag84: require('../assets/flags/84.png'),
    flag85: require('../assets/flags/85.png'),
    flag86: require('../assets/flags/86.png'),
    flag87: require('../assets/flags/87.png'),
    flag88: require('../assets/flags/88.png'),
    flag89: require('../assets/flags/89.png'),
    flag90: require('../assets/flags/90.png'),
    flag91: require('../assets/flags/91.png'),
    flag92: require('../assets/flags/92.png'),
    flag93: require('../assets/flags/93.png'),
    flag94: require('../assets/flags/94.png'),
    flag95: require('../assets/flags/95.png'),
    flag971: require('../assets/flags/971.png'),
    flag972: require('../assets/flags/972.png'),
    flag973: require('../assets/flags/973.png'),
    flag974: require('../assets/flags/974.png'),
    flag976: require('../assets/flags/976.png'),
  };

  console.log(availableOptions.length, life.length);

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

    //console.log("UPDATE score SET best_score = "+score+", date_score = date('now') WHERE categorie_score = 'numeros' AND "+score+" >= best_score;");

    db.transaction((tx) => {
        tx.executeSql(
          "UPDATE score SET best_score = "+score+", date_score = date('now') WHERE categorie_score = 'drapeaux' AND "+score+" >= best_score;",
          [],
          (txObj, resultSet) => {
            console.log("Mise à jour réussie. Lignes affectées : ", resultSet.rowsAffected);
          },
          (txObj, error) => console.log(error)
        )
    });

  
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
    var drapeauSelectionne = 'flag'+ question.numero; 
    //var drapeauSelectionne = 'flag5'; 
    return (
      <View style={styles.container}>
        
        <Image
            style={styles.imageDrapeau}
            source={images[drapeauSelectionne]} 
          />
        <View style={styles.containerScore}>
          <Text style={styles.score}>{score}/{totalQuestions}</Text>
        </View>
        <View style={styles.containerLife}>
          <Text style={styles.life}>{life}</Text>
        </View>

        <CustomModal text="Devinez un maximum de départements selon leur drapeau traditionnel (non officiel). Vous avez 3 vies indiquées par les coeurs en haut à droite."></CustomModal>
        
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
    height: "95%",
    resizeMode: "cover",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#00C7B3",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  imageDrapeau: {
    width: "80%",
    height: "25%", 
    borderRadius: 20,
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
