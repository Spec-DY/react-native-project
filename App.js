import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from "./components/Header.js";
import { useState } from 'react';
import Input from "./components/Input.js";

export default function App() {
  return (
    <View style={styles.container}>
      <Header name = "Thunder" />
      <StatusBar style="auto" />
      <Input/>
      {/* <Text>typed:{text}</Text> */}
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
