import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HeaderButton from "../components/HeaderButton";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import EditHiveScreen from "../screens/EditHiveScreen";
import HiveDetailsScreen from "../screens/HiveDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import NewHiveScreen from "../screens/NewHiveScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { MainStackParamList } from "../types";

const MainNavigator = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
    return (
        <MainNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                contentStyle: { backgroundColor: "#fff" },
                title: "",
                headerBackTitleVisible: false,
            }}
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
                name="NewHive"
                component={NewHiveScreen}
            />
            <MainNavigator.Screen
                name="HiveDetails"
                component={HiveDetailsScreen}
            />
            <MainNavigator.Screen
                name="EditHive"
                component={EditHiveScreen}
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
