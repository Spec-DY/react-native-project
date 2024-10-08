import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const PressableButton = ({ onPress, title, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressedButton
      ]}
      onPress={onPress}
      android_ripple={{ color: 'lightgray' }}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pressedButton: {
    backgroundColor: 'dodgerblue'
  },
});

export default PressableButton;
