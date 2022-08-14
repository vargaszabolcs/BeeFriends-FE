import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingsButton from "../components/SettingsButton";
import HivesScreen from "../screens/HivesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { MainStackParamList } from "../types";

const MainNavigator = createNativeStackNavigator<MainStackParamList>();

export default function MainTabNavigator() {
    return (
        <MainNavigator.Navigator initialRouteName="Hives">
            <MainNavigator.Screen
                name="Hives"
                component={HivesScreen}
                options={{
                    title: "Hives",
                    headerRight: () => (
                        <SettingsButton
                            onClick={() => { console.log("Settings button clicked"); }}
                        />
                    )
                }}
            />
            <MainNavigator.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
        </MainNavigator.Navigator>
    );
}