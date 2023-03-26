import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface IInputFieldProps {
    value: string;
    placeholder: string;
    onChangeText: (value: string) => void;
    isDisabled?: boolean;
    type: "email" | "password" | "name";
}

const InputField: React.FC<IInputFieldProps> = ({
    value,
    onChangeText,
    isDisabled,
    type,
    placeholder,
}) => (
    <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoComplete={type}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType={type === "email" ? "emailAddress" : type}
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
        secureTextEntry={type === "password"}
    />
);

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: "#c2e3ff",
        width: "100%",
        minHeight: 40,
        marginVertical: 10,
        padding: 5,
        borderRadius: 7,
    },
});

export default InputField;
