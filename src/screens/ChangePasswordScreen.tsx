import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import Title from "../components/common/Title";

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePasswordPress = () => {
        // TODO: Implement password change functionality
    };

    return (
        <View style={styles.container}>
            <Title title="Change Password" />
            <InputField
                placeholder="Current Password"
                type="password"
                onChangeText={setCurrentPassword}
                value={currentPassword}
                isDisabled={false}
            />
            <InputField
                placeholder="New Password"
                type="password"
                onChangeText={setNewPassword}
                value={newPassword}
                isDisabled={false}
            />
            <Button
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
