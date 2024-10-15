import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, Button,SafeAreaView,Alert, FlatList } from 'react-native';
import Header from "./Header.js";
import { useEffect, useState } from 'react';
import Input from "./Input.js";
import GoalItem from './GoalItem.js';
import PressableButton from './PressableButton.js';
import { deleteAllFromDB, deleteFromDB, writeToDB } from '../Firebase/firestoreHelper.js';
import { collection, onSnapshot, snapshotEqual } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup.js';


export default function Home({navigation}) {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(()=>{
    onSnapshot(collection(database, 'goals'), (querySnapshot)=>{
      updatedGoals=[]
      
      querySnapshot.forEach((docSnapshot)=>{
        
        updatedGoals.push({ id: docSnapshot.id, ...docSnapshot.data() });
        console.log(updatedGoals);
        console.log("snapshot.data", docSnapshot.data())
      });
    setGoals(updatedGoals);
  });
    return () => unsubscribe();
  }, []);

  async function handleInputData(inputData) {

    const newGoal = {text: inputData}
    console.log("newGoal: ", newGoal)
    await writeToDB("goals", newGoal);

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

    deleteFromDB(goalId, 'goals');
  }

  function handleDeleteAll(){
    Alert.alert(
      "Delete All Goals",
      "Are you sure to delete all goals?",
      [
        { text: "No" },
        { text: "Yes", onPress: async () => 
          await deleteAllFromDB()
        }
      ]
    );
  }

  function handleNavigate(goal) {
    navigation.navigate("Details", { goal})
    console.log(goal)
  }

  const ItemSeparatorComponent = ({ highlighted }) => (
    <View
    style={[
      styles.separator,
      {backgroundColor: highlighted? 'red' : 'black'}
    ]}
    />
  );
  
  const renderItem = ({ item, separators }) => (
      <GoalItem
        goal={item}
        onDelete={handleDelete}
        onGoalPress={handleNavigate}
        onPressIn={separators.highlight}
        onPressOut={separators.unhighlight}
      />

  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top} >
        <Header name = "THIS App" />
        <StatusBar style="auto" />
        
        <PressableButton 
          onPress={handleModalVisibility}
          style={styles.addGoal} 
          pressedStyle={{ backgroundColor: 'grey' }}
        >
          <Text style={styles.addButtonText}>Add a goal</Text>
        </PressableButton>


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
          handleNavigate={handleNavigate}
          ListEmptyComponent={()=> (
            <Text style={styles.goalEmptyHeader}>No Goal To Show</Text>
          )}
          ListHeaderComponent={()=> (
            goals.length > 0 ? <Text style={styles.goalHeader}>My Goals</Text>: null
          )}
          ListFooterComponent={()=> goals.length > 0 ?(
            <View style={styles.deleteAllMargin}>
              <Button title="Delete all" onPress={handleDeleteAll}/>
            </View>
          ): null}

          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparatorComponent}
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
  addGoal: {
    margin: "2%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    
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
  },
  separator: {
    height: 3,
    backgroundColor: "black",
  },
  deleteAllGoal: {
  },
  deleteAllMargin: {
    marginTop:'10%'
  },
  addButtonText: {
    fontSize:18
  }
});
