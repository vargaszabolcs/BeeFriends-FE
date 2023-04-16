import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ForgotPasswordScreen1 from "../screens/ForgotPasswordScreen1";
import { ForgotPasswordScreen2 } from "../screens/ForgotPasswordScreen2";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { AuthStackParamList } from "../types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function LoginScreenStack() {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                contentStyle: { backgroundColor: "#fff" },
                headerBackTitleVisible: false,
            }}
        >
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: "Login",
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    title: "Sign Up",
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="ForgotPassword1"
                component={ForgotPasswordScreen1}
                options={{
                    title: "",
                }}
            />
            <AuthStack.Screen
                name="ForgotPassword2"
                component={ForgotPasswordScreen2}
                options={{
                    title: "",
                }}
            />
        </AuthStack.Navigator>
    );
}
