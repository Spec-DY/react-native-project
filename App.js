import {View, Text} from "react-native"
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "react-native";


const Stack = createNativeStackNavigator();

export default function App() {

  const screenStyling = {
    headerStyle:{backgroundColor:'skyblue'},
    headerTintColor:'white'
  }


  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={screenStyling}>
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{title:"My Goal"}}/>
          <Stack.Screen 
            name="Details" 
            component={GoalDetails}
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
