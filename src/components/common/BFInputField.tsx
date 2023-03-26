import React from "react";
import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

interface IBFInputFieldProps {
    value: string;
    placeholder: string;
    onChangeText: (value: string) => void;
    isDisabled?: boolean;
    type: "email" | "password" | "name";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    style?: StyleProp<TextStyle>;
}

const BFInputField: React.FC<IBFInputFieldProps> = ({
    value,
    onChangeText,
    isDisabled,
    type,
    placeholder,
    autoCapitalize,
    style,
}) => (
    <TextInput
        style={[styles.inputField, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoComplete={type}
        autoCapitalize={autoCapitalize}
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

export default BFInputField;
