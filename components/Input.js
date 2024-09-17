import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Modal } from "react-native";

const Input = ({autoFocus, onConfirm, modalVisibility}) => {
    const [text, setText] = useState('')
    const [hasBlurred, setHasBlurred] = useState('')
    const handleBlur = ()=> {setHasBlurred(true)};
    const handleFocus = ()=> {setHasBlurred(false)};
    function handleConfirm() {
            onConfirm(text)
    }


    return(
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisibility}>
            <View style={styles.container}>
                <TextInput
                    style = {{borderWidth: 2}}
                    autoCorrect={true}
                    placeholder='Enter here'
                    onChangeText={(changedText) => {
                    setText(changedText);
                    }}
                    value={text}
                    keyboardType='default'
                    autoFocus={autoFocus}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    />
                {text.length > 0 && !hasBlurred && (
                    <Text>{`Character count: ${text.length}`}</Text>
                )}

                {hasBlurred && (
                    <Text>
                        {text.length >= 3 ? "Thank you" : "Please type more than 3 characters"}
                    </Text>
                )}

                <Button title="Confirm" onPress={handleConfirm}/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Input;

