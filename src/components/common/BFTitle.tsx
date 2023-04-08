import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface IBFTitleProps {
    title: string;
    style?: StyleProp<TextStyle>;
}

const BFTitle: React.FC<IBFTitleProps> = ({ title, style }) => (
    <Text style={[styles.title, style]}>{title}</Text>
);

export default BFTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
    },
});
