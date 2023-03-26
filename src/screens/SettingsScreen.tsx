import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/common/Button";
import Title from "../components/common/Title";
import { removeLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { logOut } from "../store/appSlice";
import { MainStackParamList } from "../types";

type SettingsScreenProps = NativeStackScreenProps<MainStackParamList, "Settings">;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await removeLocalData(StorageKeys.USER_DATA, true);
        dispatch(logOut());
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Title title="Settings" />
                <Text style={styles.sectionTitle}>Account</Text>
                <Button
                    title="Change Password"
                    onPress={() => navigation.navigate("ChangePassword")}
                />
                <Button
                    title="Delete Account"
                    onPress={() => navigation.navigate("DeleteAccount")}
                />
            </View>
            <View style={styles.section}>
                <Button
                    title="Logout"
                    onPress={handleLogout}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default SettingsScreen;
