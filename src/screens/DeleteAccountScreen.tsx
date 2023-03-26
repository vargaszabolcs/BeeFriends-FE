import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import Screen from "../components/common/Screen";
import Title from "../components/common/Title";

const DeleteAccountScreen: React.FC = () => {
    const [password, setPassword] = useState("");

    const handleDelete = () => {
        // Call API to delete account
        // Pass in password as parameter
        // onDelete();
    };

    return (
        <Screen applyPadding>
            <Title title="Delete Account" />
            <Text style={styles.warningText}>
                Warning: Deleting your account is permanent and cannot be undone.
            </Text>
            <InputField
                placeholder="Current Password"
                value={password}
                onChangeText={setPassword}
                type="password"
            />
            <Button
                title="Delete Account"
                onPress={handleDelete}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    warningText: {
        fontWeight: "bold",
    },
});

export default DeleteAccountScreen;
