import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ForgotPasswordScreen1 from "../screens/ForgotPasswordScreen1";
import { ForgotPasswordScreen2 } from "../screens/ForgotPasswordScreen2";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { LoginStackParamList } from "../types";

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginScreenStack() {
    return (
        <LoginStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                contentStyle: { backgroundColor: "#fff" },
                headerBackTitleVisible: false,
            }}
        >
            <LoginStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: "Login",
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    title: "Sign Up",
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="ForgotPassword1"
                component={ForgotPasswordScreen1}
                options={{
                    title: "",
                }}
            />
            <LoginStack.Screen
                name="ForgotPassword2"
                component={ForgotPasswordScreen2}
                options={{
                    title: "",
                }}
            />
        </LoginStack.Navigator>
    );
}
