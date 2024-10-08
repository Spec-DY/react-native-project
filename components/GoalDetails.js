import { NavigationHelpersContext } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {Text, View, Button} from "react-native"
import { useState } from "react";


export default function GoalDetails({route, navigation}){

  const { goal } = route.params || {};
  const [isWarning, setIsWarning] = useState(false)

  function moreDetailsHandler() {
      navigation.push('Details')
  }


  function handleWarning() {
    setIsWarning(true)
    navigation.setOptions({ title:"Warning!"})
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Warning"
          onPress={handleWarning}
          color="red"
        />
      ),
    });
  }, [navigation]);


  return (
    <View >
      {goal?.id ? (
          <View>
              <Text style={isWarning && {color:'red'}}>Goal Details</Text>
              <Text style={isWarning && {color:'red'}}>Goal: {goal.text}</Text>
              <Text style={isWarning && {color:'red'}}>ID: {goal.id}</Text>
              <Button title="More Details" onPress={moreDetailsHandler} />
              </View>
      ) : (
          <Text style={isWarning && {color:'red'}}>No Goal Details Available</Text>
      )}
    </View>
  )
}