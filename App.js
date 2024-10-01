import {View, Text} from "react-native"
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {


  return (
    <NavigationContainer>

        <Home />
    </NavigationContainer>
      
  );
}
