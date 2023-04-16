import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";

export const ForgotPasswordScreen2: React.FC = () => {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");

    const handleReset = () => {
        if (token && password) {
            // TODO: implement password reset logic here
        }
    };

    return (
        <BFScreen applyPadding>
            <BFTitle title="Reset Password" />
            <Text style={styles.instructions}>
                Check your email for a reset token and enter it below:
            </Text>
            <BFInputField
                placeholder="Token"
                value={token}
                onChangeText={setToken}
                style={styles.input}
                contentType={"name"}
            />
            <Text style={styles.instructions}>Enter a new password:</Text>
            <BFInputField
                placeholder="New Password"
                value={password}
                onChangeText={setPassword}
                contentType="name"
                style={styles.input}
            />
            <BFButton
                onPress={handleReset}
                style={styles.button}
                title="Reset Password"
            />
        </BFScreen>
    );
};

const styles = StyleSheet.create({
    instructions: {
        fontSize: 18,
        marginTop: 10,
    },
    input: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
    },
});
