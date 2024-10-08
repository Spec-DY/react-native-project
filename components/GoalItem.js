import {View, Text, StyleSheet, Button, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";

const GoalItem=({goal, onDelete}) => {
    console.log(goal)
    const navigation = useNavigation();

    function handleNavigate() {
      navigation.navigate('Details', { goal });
    }
  
    return (
      <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer
      ]}
      onPress={handleNavigate}
      android_ripple={{ color: "lightgrey" }}
      >
      <Text style={styles.goalText}>{goal.text}</Text>
      <View style={{ margin: 5 }} />

        <PressableButton
          title="X"
          onPress={() => onDelete(goal.id)}
          style={styles.deleteButton}
        />
    </Pressable>
  );
};

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
      color: 'grey'
    },
    deleteText: {
      fontSize: 16,
      color: 'red',
    },
    pressedContainer: {
      backgroundColor: "lightgrey",
    },
    pressedDeleteButton: {
      backgroundColor: "red",
    },
    deleteButton: {
      padding: 5,
      borderRadius: 5,
      backgroundColor:'red'
    }
  });
  
  export default GoalItem;