import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { LoginStackParamList } from "../types";
import React from "react";

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginScreenStack() {
    return (
        <LoginStack.Navigator initialRouteName="Login">
            <LoginStack.Screen name="Login" component={LoginScreen} options={{ title: "Login", headerShown: false, contentStyle: {backgroundColor: "#fff"} }} />
            <LoginStack.Screen name="Signup" component={SignupScreen} options={{ title: "Sign Up", headerShown: false, contentStyle: {backgroundColor: "#fff"} }} />
        </LoginStack.Navigator>
    );
}