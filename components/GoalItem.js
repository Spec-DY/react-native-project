import {View, Text, StyleSheet, Button} from "react-native";

const GoalItem=({goal, onDelete}) => {
    console.log(goal)

    return (
        <View style={styles.container}>
            <Text style={styles.goalText}>{goal.text}</Text>
            <Button
                title="X"
                color="red" 
                onPress={() => onDelete(goal.id)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: "green",
      margin: "1%",
      padding: 5,
      flexDirection: 'row',
      alignItems:"center"
    },
    goalText: {
      fontSize: 20,
      color: 'white',
    },
  });
  
  export default GoalItem;