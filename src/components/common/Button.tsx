import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity } from "react-native";

interface IButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<TouchableOpacity>;
}

const Button: React.FC<IButtonProps> = ({ title, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.button}
    >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#EFEFEF",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        width: "100%",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
        textAlign: "center",
    },
});

export default Button;
