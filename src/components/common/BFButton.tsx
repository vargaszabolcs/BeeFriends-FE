import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface IBFButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    isDisabled?: boolean;
}

const BFButton: React.FC<IBFButtonProps> = ({ title, onPress, style, isDisabled }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button, style]}
        disabled={isDisabled}
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

export default BFButton;
