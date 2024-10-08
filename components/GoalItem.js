import {View, Text, StyleSheet, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";

const GoalItem=({goal, onDelete, onGoalPress}) => {
    console.log(goal)
    const navigation = useNavigation();

    function handleNavigate() {
      navigation.navigate('Details', { goal });
    }
  
    return (
        <View style={styles.container}>
            <Text style={styles.goalText}>{goal.text}</Text>
            <Button
                title="X"
                color="red" 
                onPress={() => onDelete(goal.id)}
            />
            <View style={{margin:5}} />
            <Button title="i" onPress={handleNavigate} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: "lavender",
      margin: "1%",
      padding: 5,
      flexDirection: 'row',
      alignItems:"center"
    },
    goalText: {
      fontSize: 20,
      color: 'grey',
    },
  });
  
  export default GoalItem;