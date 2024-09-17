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
            transparent={true}
            visible={modalVisibility}>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <TextInput
                        style = {styles.textInput}
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

                    <View style={styles.button}>
                        <Button title="Confirm" onPress={handleConfirm}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
        width: '70%',
        color:"purple",
        marginBottom: '1%',
        padding: '2%',
        borderColor: 'purple',
        borderWidth: 2,
        textAlign: 'left'
    },
    button: {
      width: '30%',
      margin: "2%",
    },
    modal: {
        width: '83%',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    }
});

export default Input;

