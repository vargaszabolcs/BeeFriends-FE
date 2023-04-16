// BFInputField.tsx
import React from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import { fromHsv, TriangleColorPicker } from "react-native-color-picker";

interface IBFInputFieldProps {
    value: string;
    placeholder: string;
    onChangeText: (value: string) => void;
    isDisabled?: boolean;
    contentType?: "email" | "password" | "name" | "color";
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    style?: StyleProp<TextStyle>;
    errorMessage?: string;
    label?: string;
}

const BFInputField: React.FC<IBFInputFieldProps> = ({
    value,
    onChangeText,
    isDisabled,
    contentType,
    placeholder,
    autoCapitalize,
    keyboardType,
    style,
    errorMessage,
    label,
}) => (
    <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        {contentType === "color" ? (
            <TriangleColorPicker
                style={styles.colorPicker}
                onColorChange={color => onChangeText(fromHsv(color))}
                color={value}
            />
        ) : (
            <TextInput
                style={[styles.inputField, style]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                autoComplete={contentType}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                textContentType={contentType === "email" ? "emailAddress" : contentType}
                keyboardType={keyboardType}
                editable={!isDisabled}
                selectTextOnFocus={!isDisabled}
                secureTextEntry={contentType === "password"}
            />
        )}
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        paddingBottom: 5,
    },
    inputField: {
        backgroundColor: "#c2e3ff",
        width: "100%",
        minHeight: 40,
        marginBottom: 10,
        padding: 5,
        borderRadius: 7,
    },
    errorText: {
        color: "red",
        marginTop: 5,
    },
    colorPicker: {
        width: "100%",
        height: 200,
    },
});

export default BFInputField;
