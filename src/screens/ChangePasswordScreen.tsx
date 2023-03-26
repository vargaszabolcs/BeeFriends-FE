import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFTitle from "../components/common/BFTitle";

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePasswordPress = () => {
        // TODO: Implement password change functionality
    };

    return (
        <View style={styles.container}>
            <BFTitle title="Change Password" />
            <BFInputField
                placeholder="Current Password"
                type="password"
                onChangeText={setCurrentPassword}
                value={currentPassword}
                isDisabled={false}
            />
            <BFInputField
                placeholder="New Password"
                type="password"
                onChangeText={setNewPassword}
                value={newPassword}
                isDisabled={false}
            />
            <BFButton
                title={"Change Password"}
                onPress={handleChangePasswordPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 20,
    },
});

export default ChangePasswordScreen;
