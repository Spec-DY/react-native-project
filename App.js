import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, Button,SafeAreaView,Alert } from 'react-native';
import Header from "./components/Header.js";
import { useState } from 'react';
import Input from "./components/Input.js";

export default function App() {
  const [text, setText] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  function handleInputData(inputData) {
    setText(inputData)
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
        onPress: () => setModalVisibility(false)
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
        <View style={styles.bottomText}>
          <Text style={styles.text}>typed:{text}</Text>
        </View>
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
    width:"100%"
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
  }
});
