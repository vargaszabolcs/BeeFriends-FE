import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import BFButton from "../components/common/BFButton";
import BFTitle from "../components/common/BFTitle";
import { logOut } from "../store/authSlice";
import { MainStackParamList } from "../types";

type SettingsScreenProps = NativeStackScreenProps<MainStackParamList, "Settings">;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logOut());
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <BFTitle title="Settings" />
                <Text style={styles.sectionTitle}>Account</Text>
                <BFButton
                    title="Change Password"
                    onPress={() => navigation.navigate("ChangePassword")}
                />
                <BFButton
                    title="Delete Account"
                    onPress={() => navigation.navigate("DeleteAccount")}
                />
            </View>
            <View style={styles.section}>
                <BFButton
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
