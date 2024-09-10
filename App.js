import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from "./components/Header.js";
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <Header name = "Thunder" />
        <TextInput
          style = {{borderWidth: 3}}
          autoCorrect={true}
          placeholder='Enter here'
          onChangeText={(changedText) => {
            setText(changedText);
            console.log("1");
          }}
          value={text}
          keyboardType='default'/>
      <StatusBar style="auto" />
      
      <Text>
        typed:{text}
      </Text>
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
