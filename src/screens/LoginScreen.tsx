import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosResponse } from "axios";
import { useAssets } from "expo-asset";
import React, { useState } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import BFErrorText from "../components/common/BFErrorText";
import BFScreen from "../components/common/BFScreen";
import ExtraLink from "../components/login/ExtraLink";
import LoginInputs from "../components/login/LoginInputs";
import SubmitButton from "../components/login/SubmitButton";
import apiClient from "../network/apiClient";
import { logIn } from "../store/authSlice";
import { AuthStackParamList, IUser, LoginResponse } from "../types";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
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
            const response: AxiosResponse<LoginResponse> = await apiClient.post(
                "/auth/login",
                data,
            );
            if (response.data.error) {
                setError(response.data.error);
                setIsLoading(false);
            } else {
                setError("");
                const userData: IUser = response.data;
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
        <BFScreen
            style={styles.container}
            applyPadding
            hasNoHeader
        >
            {assets ? (
                <Image
                    style={styles.logo}
                    source={assets[0] as ImageSourcePropType}
                />
            ) : null}

            <LoginInputs
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                isDisabled={isLoading}
            />

            <BFErrorText error={error} />

            <SubmitButton
                text="Login"
                onPress={onSubmit}
                isDisabled={isLoading}
            />

            <ExtraLink
                text="Forgot password?"
                onPress={() => {
                    navigation.navigate("ForgotPassword1");
                }}
            />
            <ExtraLink
                text="I don't have an account!"
                onPress={() => {
                    navigation.navigate("Signup");
                }}
            />
        </BFScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // padding: 20,
    },
    logo: {
        width: 300,
        height: 300,
    },
});

export default LoginScreen;
