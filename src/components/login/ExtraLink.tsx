import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IExtraLinksProps {
    onPress: () => void;
    text: string;
}

const ExtraLink: React.FC<IExtraLinksProps> = ({ onPress, text }) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.extraLinks}
    >
        <Text style={{ color: "grey", fontSize: 12 }}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    extraLinks: {
        width: "auto",
        margin: 5,
    },
});

export default ExtraLink;
