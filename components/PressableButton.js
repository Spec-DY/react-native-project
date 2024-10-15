import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const PressableButton = ({ onPress, style, pressedStyle, ripple, children }) => {
    
  return (
    <Pressable
      onPress={onPress}
      android_ripple={ripple || { color: 'lightgray' }}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && [styles.pressedButton, pressedStyle],
      ]}
    >
      <View style={styles.content}>
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'deepskyblue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedButton: {
    backgroundColor: 'dodgerblue',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default PressableButton;
