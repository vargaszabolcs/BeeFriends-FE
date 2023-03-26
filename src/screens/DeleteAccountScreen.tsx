import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";

const DeleteAccountScreen: React.FC = () => {
    const [password, setPassword] = useState("");

    const handleDelete = () => {
        // Call API to delete account
        // Pass in password as parameter
        // onDelete();
    };

    return (
        <BFScreen applyPadding>
            <BFTitle title="Delete Account" />
            <Text style={styles.warningText}>
                Warning: Deleting your account is permanent and cannot be undone.
            </Text>
            <BFInputField
                placeholder="Current Password"
                value={password}
                onChangeText={setPassword}
                type="password"
            />
            <BFButton
                title="Delete Account"
                onPress={handleDelete}
            />
        </BFScreen>
    );
};

const styles = StyleSheet.create({
    warningText: {
        fontWeight: "bold",
    },
});

export default DeleteAccountScreen;
