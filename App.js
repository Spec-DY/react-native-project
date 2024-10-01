import {View, Text} from "react-native"
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "react-native";


const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
        options={{
          title: "My Goals",
          headerStyle: { backgroundColor: 'skyblue' },
          headerTintColor: 'white',
        }}/>
        <Stack.Screen name="Details" component={GoalDetails}
        options={({route})=>{return {
          title: route.params? route.params.goal.text: "More Details",
          headerRight:()=>{
            return <Button title="Warning" onPress={()=>{
              console.log("warning")
            }}/>
          }}}} />
      </Stack.Navigator>
    </NavigationContainer>
      
  );
}
