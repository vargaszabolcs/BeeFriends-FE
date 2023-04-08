import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BFTitle from "../common/BFTitle";

const WelcomeContainer = () => {
    const userData = useSelector((state: RootState) => state.app.userData);

    return (
        <View style={styles.container}>
            <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>
                    {"Welcome, "}
                    <Text style={styles.welcomeTextName}>{userData?.full_name}</Text>!
                </Text>
            </View>
            <BFTitle
                title={"My hives"}
                style={styles.title}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginBottom: 10,
    },
    container: {
        padding: 10,
    },
    welcomeTextContainer: {
        flexDirection: "row",
        paddingTop: 10,
    },
    welcomeText: {
        fontSize: 22,
    },
    welcomeTextName: {
        fontWeight: "bold",
    },
});

export default WelcomeContainer;
