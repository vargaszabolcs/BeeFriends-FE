import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

interface IExtraLinksProps {
    onPress: () => void,
    text: string
}

const ExtraLink: React.FC<IExtraLinksProps> = ({onPress, text}) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.extraLinks}
        >
            <Text style={{color: "grey", fontSize: 12 }}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    extraLinks: {
        width: "auto",
        margin: 5
    },
});

export default ExtraLink;
