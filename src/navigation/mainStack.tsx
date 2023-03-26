import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HeaderButton from "../components/HeaderButton";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { MainStackParamList } from "../types";

const MainNavigator = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
    return (
        <MainNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{ contentStyle: { backgroundColor: "#fff" }, title: "" }}
        >
            <MainNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: "Home",
                    headerRight: () => (
                        <HeaderButton
                            onClick={() => {
                                navigation.navigate("Settings");
                            }}
                        />
                    ),
                })}
            />
            <MainNavigator.Screen
                name="Settings"
                component={SettingsScreen}
            />
            <MainNavigator.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
            />
            <MainNavigator.Screen
                name="DeleteAccount"
                component={DeleteAccountScreen}
            />
        </MainNavigator.Navigator>
    );
}
