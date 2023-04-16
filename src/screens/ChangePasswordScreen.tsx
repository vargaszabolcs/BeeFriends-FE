import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useDispatch, useStore } from "react-redux";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFTitle from "../components/common/BFTitle";
import { changePasswordAsync } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { MainStackParamList } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "ChangePassword">;

const ChangePasswordScreen: React.FC<Props> = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const store = useStore<RootState>();

    const handleChangePasswordPress = async () => {
        setIsLoading(true);

        const userId = store.getState().app.userData?.id;

        if (userId) {
            const result = await dispatch(
                changePasswordAsync(userId, currentPassword, newPassword),
            );

            if (result.error) {
                console.log("Error changing password: " + result.error);
                Alert.alert("Error changing password!", result.error, [
                    {
                        text: "OK",
                    },
                ]);
            } else {
                Alert.alert("Password changed successfully!", undefined, [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.goBack();
                        },
                    },
                ]);
            }
        }

        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <BFTitle title="Change Password" />
            <BFInputField
                placeholder="Current Password"
                contentType="password"
                onChangeText={setCurrentPassword}
                value={currentPassword}
                isDisabled={isLoading}
            />
            <BFInputField
                placeholder="New Password"
                contentType="password"
                onChangeText={setNewPassword}
                value={newPassword}
                isDisabled={isLoading}
            />
            <BFButton
                title={"Change Password"}
                onPress={handleChangePasswordPress}
                isDisabled={isLoading}
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
