import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import styles from '../style/styles'
import { signInWithEmailAndPassword  } from 'firebase/auth';
import {auth} from "../Firebase/firebaseSetup"
import { Alert } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        Alert.alert("Success", "User registered successfully!");
        // Navigate to Home or any other screen if needed
        navigation.replace("Home");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }
  };

  return (
    <View style={styles.sign}>
      <Text>Login</Text>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input}
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{margin:5}}></View>
      <Button 
        title="Don't have an account? Sign Up" 
        onPress={() => navigation.replace("Signup")} 
      />
    </View>
  );
}