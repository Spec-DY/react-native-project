import {Text, View, Button} from "react-native"


export default function GoalDetails({route, navigation}){

        const { goal } = route.params || {};
        function moreDetailsHandler() {
            navigation.push('Details')
        }

        return (
          <View >
            {goal?.id ? (
                <View>
                    <Text>Goal Details</Text>
                    <Text>Goal: {goal.text}</Text>
                    <Text>ID: {goal.id}</Text>
                    <Button title="More Details" onPress={moreDetailsHandler} />
                    </View>
            ) : (
                <Text>No Goal Details Available</Text>
            )}
          </View>
        )
}