import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({name})=> {
  return (
    <View>
      <Text style={styles.text}>Welcome to {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color:"purple",
    fontSize:20,
    marginBottom: '2%',
    padding: '2%',
    borderColor: 'purple',
    borderWidth: 2,
    textAlign: 'center'
  }
})

export default Header;