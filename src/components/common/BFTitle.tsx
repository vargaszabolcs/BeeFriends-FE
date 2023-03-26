import React from "react";
import { StyleSheet, Text } from "react-native";

interface IBFTitleProps {
    title: string;
}

const BFTitle: React.FC<IBFTitleProps> = ({ title }) => <Text style={styles.title}>{title}</Text>;

export default BFTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
    },
});
