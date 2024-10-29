import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';

// Import screens
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return ()=>unsubscribe;
  }, []);

  const handleSignOut = async (navigation) => {
    try {
      await signOut(auth);
      Alert.alert("Success", "You have been signed out.");
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  const screenStyling = {
    headerStyle: { backgroundColor: 'skyblue' },
    headerTintColor: 'white'
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenStyling}>
        {isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={({ navigation }) => ({
                title: "My Goal",
                headerRight: () => (
                  <Button
                    title="Profile"
                    onPress={() => navigation.navigate("Profile")}
                  />
                ),
              })}
            />
            <Stack.Screen name="Details" component={GoalDetails} />
            <Stack.Screen 
              name="Profile" 
              component={Profile} 
              options={({ navigation }) => ({
                title: "Profile",
                headerRight: () => (
                  <Button
                    title="Sign Out"
                    onPress={() => handleSignOut(navigation)}
                  />
                ),
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title: "Sign Up" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
