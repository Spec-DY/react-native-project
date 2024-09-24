import {View, Text, StyleSheet} from "react-native";

const GoalItem=({goal}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.goalText}>{goal.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: "grey",
      margin: "1%",
      padding: 5,
    },
    goalText: {
      fontSize: 14,
      color: '#fff',
    },
  });
  
  export default GoalItem;