import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({name})=> {
  return (
    <View>
      <Text>Welcome to {name}</Text>
    </View>
  );
}

export default Header;