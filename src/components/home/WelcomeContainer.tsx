import React from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const WelcomeContainer = () => {
    const userData = useSelector((state: RootState) => state.app.userData);

    return (
        <Text style={styles.welcomeText}>
            {"Welcome, "}
            <Text style={styles.welcomeTextName}>{userData?.full_name}</Text>!
        </Text>
    );
};

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 22,
    },
    welcomeTextName: {
        fontWeight: "bold",
    },
});

export default WelcomeContainer;
