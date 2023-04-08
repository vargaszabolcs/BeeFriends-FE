import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type Props = {
    readonly error: string;
    readonly style?: StyleProp<TextStyle>;
};

const BFErrorText = ({ error, style }: Props) => (
    <Text style={[styles.errorText, style]}>{error}</Text>
);

export default BFErrorText;

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        width: "90%",
    },
});
