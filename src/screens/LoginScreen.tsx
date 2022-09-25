import axios, { AxiosResponse } from "axios";
import { useAssets } from "expo-asset";
import React, { useState } from "react";
import { StyleSheet, Image, ImageSourcePropType, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ExtraLink from "../components/login/ExtraLink";
import LoginInputs from "../components/login/LoginInputs";
import SubmitButton from "../components/login/SubmitButton";
import Network from "../constants/Network";
import { IUser, LoginResponse, LoginStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { useDispatch } from "react-redux";
import { logIn } from "../store/appSlice";

type ILoginScreenProps = NativeStackScreenProps<LoginStackParamList, "Login">;

const LoginScreen: React.FC<ILoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [assets] = useAssets([require("../../assets/images/bee_logo.png")]);

    const dispatch = useDispatch();

    const onSubmit = async () => {
        setIsLoading(true);
        const data = { email, password };
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(
                Network.API_URL + "/auth/login",
                data,
                { timeout: 5000 },
            );
            if (response.data.error) {
                setError(response.data.error);
                setIsLoading(false);
            } else {
                setError("");
                const userData: IUser = {
                    token: response.data.token,
                    email: email,
                    full_name: response.data.full_name,
                };
                saveLocalData(StorageKeys.USER_DATA, JSON.stringify(userData), true);
                dispatch(logIn(userData));
            }
        } catch (err) {
            setError(
                "Something went wrong. Please try again later and check your internet connection!",
            );
            setIsLoading(false);
            console.error(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {assets ? (
                <Image
                    source={assets[0] as ImageSourcePropType}
                    style={styles.logo}
                />
            ) : null}

            <LoginInputs
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                isDisabled={isLoading}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <SubmitButton
                text="Login"
                onPress={onSubmit}
                isDisabled={isLoading}
            />

            <ExtraLink
                text="Forgot password?"
                onPress={() => {
                    console.log("forgot");
                }}
            />
            <ExtraLink
                text="I don't have an account!"
                onPress={() => {
                    navigation.navigate("Signup");
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 300,
    },
    error: {
        color: "red",
        width: "90%",
    },
});

export default LoginScreen;
