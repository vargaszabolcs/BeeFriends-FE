import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

interface ISubmitButtonProps {
    text: string,
    onPress: () => void,
    isDisabled: boolean,
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({text, onPress, isDisabled}) => (
    <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={
            ({pressed}) => {
                if (isDisabled) {
                    return styles.submitButtonDisabled;
                }
                return pressed ? {...styles.submitButton, backgroundColor: "#2e55b7"} : styles.submitButton;
            }
        }
    >
        <Text style={{color: "white"}}>
            {text}
        </Text>
    </Pressable>
);

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: "#2e78b7",
        elevation: 4,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        minHeight: 30,
        margin: 10,
        marginTop: 30,
        padding: 10,
        borderRadius: 7,
    },
    submitButtonDisabled: {
        backgroundColor: "#c2e3ff",
        elevation: 0,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        minHeight: 30,
        margin: 10,
        marginTop: 30,
        padding: 10,
        borderRadius: 7,
    }
});

export default SubmitButton;
