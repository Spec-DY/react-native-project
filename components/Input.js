import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const Input = ({autoFocus}) => {
    const [text, setText] = useState('')
    const [hasBlurred, setHasBlurred] = useState('')
    const handleBlur = ()=> {setHasBlurred(true)};
    const handleFocus = ()=> {setHasBlurred(false)};

    return(
        <View>
            <TextInput
                style = {{borderWidth: 3}}
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
    </View>
    )
}

export default Input;

