import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

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
              txObj.executeSql(
                'SELECT * FROM departements',
                [],
                (txObj, resultSet) => {
                  setAllOptions(resultSet.rows._array);
                  setAvailableOptions([...resultSet.rows._array]);
                },
                (txObj, error) => console.log(error)
              )
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
    } else {
      console.log('Mauvaise réponse!');
      life.splice(0,1);
    }
  
    // Charger une nouvelle question aléatoires
    loadRandomQuestion();
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
        {additionalContent}
        <Text style={styles.scoreFinal}>{score}/{totalQuestions}</Text>
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
        
        {
          options.map((option, index) => (
            <View key={index} style={styles.optionsContainer}>
              <TouchableOpacity style={[
                  styles.optionBtn,
                  option === question.nom ? styles.correctOption : styles.incorrectOption,
                ]} key={index} onPress={() => handleAnswer(option)}>
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
