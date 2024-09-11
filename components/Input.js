import { useState } from "react";
import { TextInput } from "react-native";

const Input = () => {
    const [text, setText] = useState('')
    return(
        <TextInput
            style = {{borderWidth: 3}}
            autoCorrect={true}
            placeholder='Enter here'
            onChangeText={(changedText) => {
            setText(changedText);
            }}
            value={text}
            keyboardType='default'/>
    )
}

export default Input;

