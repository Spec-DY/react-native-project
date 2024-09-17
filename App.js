import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, Button } from 'react-native';
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
  return (
    <View style={styles.container}>
      <Header name = "Thunder" />
      <StatusBar style="auto" />
      <Input autoFocus={true} onConfirm={handleInputData} modalVisibility={modalVisibility}/>
      <Button title="Add a goal" onPress={handleModalVisibility} />
      <Text>typed:{text}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
