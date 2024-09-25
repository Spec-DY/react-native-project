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

  function handleDelete(goalId){
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
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
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          ListEmptyComponent={()=> (
            <Text style={styles.goalEmptyHeader}>No Goal To Show</Text>
          )}
          ListHeaderComponent={()=> (
            goals.length > 0 ? <Text style={styles.goalHeader}>My Goals</Text>: null
          )}
          renderItem={(itemData) => <GoalItem goal={itemData.item} onDelete={handleDelete}/>}
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
    width:"100%",
    padding:"1%"

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
  },
  scrollViewContainer:{
    alignItems:"center"
  },
  goalEmptyHeader:{
    backgroundColor:"white",
    color:'#808080',
    padding:'1%',
    fontSize:25,
    borderRadius:10
  },
  goalHeader:{
    backgroundColor:"lightcyan",
    color:'#808080',
    padding:'1%',
    fontSize:25,
    borderRadius:10
  }
});
