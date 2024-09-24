import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, Button,SafeAreaView,Alert, FlatList } from 'react-native';
import Header from "./components/Header.js";
import { useState } from 'react';
import Input from "./components/Input.js";
import GoalItem from './components/GoalItem.js';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  function handleInputData(inputData) {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: inputData, id: Math.random().toString() },
    ]);

    // set modal
    setModalVisibility(false);
  }

  function handleModalVisibility(){
    setModalVisibility(!modalVisibility)
  }

  function handleCancel() {
    Alert.alert(
      "Example Alert",
      "Are you sure to cancel?",
    [
      {
        text:"Cancel"
      },
      {
        text:"OK",
        onPress: () => {setModalVisibility(false); }
      }
    ]
  )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top} >
        <Header name = "THIS App" />
        <StatusBar style="auto" />
        
        <View style={styles.button}>
          <Button title="Add a goal" onPress={handleModalVisibility} />
        </View>
      </View>

      <Input  autoFocus={true}
              onConfirm={handleInputData} 
              modalVisibility={modalVisibility} 
              onCancel={handleCancel}/>
      
      <View style={styles.bottom}>
        {/* goals */}
        <FlatList
          data={goals}
          renderItem={(itemData) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{itemData.item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  top:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }, 
  bottom:{
    flex: 4,
    backgroundColor: "aqua",
    alignItems:"center",
    width:"100%",
    padding:"1%"

  },
  bottomText:{
    borderRadius:10,
    backgroundColor:"cornsilk"
  },
  text: {
    fontSize: 14,
    color: '#dc143c',
    marginTop: "2%",
    padding:5,
  },
  button: {
    width: '30%',
    margin: "2%"
  },
  goalItem: {
    borderRadius:10,
    backgroundColor:"grey",
    margin: "1%",
    padding: 5
  }
});
