import { StyleSheet, TextInput } from "react-native";
import React from "react";


interface IInputFieldProps {
    value: string;
    placeholder: string;
    onChangeText: (value: string) => void;
    isDisabled: boolean;
    type: "email" | "password" | "name";
}

const InputField: React.FC<IInputFieldProps> = ({value, onChangeText, isDisabled, type, placeholder}) => {
    return (
        <TextInput
            style={styles.inputField}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            autoCompleteType={type}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType={type === "email" ? "emailAddress" : type}
            editable={!isDisabled}
            selectTextOnFocus={!isDisabled}
            secureTextEntry={type === "password"}
        />
    );
};


const styles = StyleSheet.create({
    inputField: {
        backgroundColor: "#c2e3ff",
        width: "90%",
        minHeight: 40,
        margin: 10,
        padding: 5,
        borderRadius: 7
    },
});


export default InputField;