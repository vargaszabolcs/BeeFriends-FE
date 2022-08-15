import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingsButton from "../components/SettingsButton";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { MainStackParamList } from "../types";

const MainNavigator = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
    return (
        <MainNavigator.Navigator initialRouteName="Home">
            <MainNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation}) => ({
                    headerRight: () => <SettingsButton onClick={() => {navigation.navigate("Settings");}} />,
                })}
            />
            <MainNavigator.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
        </MainNavigator.Navigator>
    );
}