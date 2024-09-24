import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Modal, Image } from "react-native";

const Input = ({autoFocus, onConfirm, modalVisibility, onCancel}) => {
    const [text, setText] = useState('')
    const [hasBlurred, setHasBlurred] = useState('')
    const handleBlur = ()=> {setHasBlurred(true)};
    const handleFocus = ()=> {setHasBlurred(false)};
    function handleConfirm() {
        onConfirm(text)
        setText("")
    }

    function handleCancel() {
        onCancel()
        setText("")
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibility}>
            <View style={styles.container}>
                
                <View style={styles.modal}>
                    <Image 
                        source={{uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png"}}
                        style= {styles.image} 
                        alt="darts"/>
                    <Image 
                        source={require("../assets/arrow.png")}
                        style={styles.image}
                        alt="darts"/>
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
                        <Button title="Cancel" onPress={handleCancel} />
                        <View style={{width:20}}></View>
                        <Button title="Confirm" onPress={handleConfirm} disabled={text.length < 3}/>
                        
                        
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
      flexDirection: "row",
      justifyContent: 'center'

    },
    modal: {
        width: '83%',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    image: {
        width:100,
        height:100
    }
});

export default Input;

