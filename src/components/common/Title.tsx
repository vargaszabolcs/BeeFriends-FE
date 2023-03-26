import React from "react";
import { StyleSheet, Text } from "react-native";

interface ITitleProps {
    title: string;
}

const Title: React.FC<ITitleProps> = ({ title }) => <Text style={styles.title}>{title}</Text>;

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
    },
});
