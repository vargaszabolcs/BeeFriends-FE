import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios, { AxiosResponse } from "axios";
import { useAssets } from "expo-asset";
import React, { useState } from "react";
import { ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import ExtraLink from "../components/login/ExtraLink";
import LoginInputs from "../components/login/LoginInputs";
import SubmitButton from "../components/login/SubmitButton";
import Network from "../constants/Network";
import { saveLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { logIn } from "../store/appSlice";
import { IUser, LoginResponse, LoginStackParamList } from "../types";

const Container = styled(SafeAreaView)`
    flex: 1;
    align-items: center;
    padding: 20px;
`;
const Logo = styled.Image`
    width: 300px;
    height: 300px;
`;
const ErrorText = styled.Text`
    color: "red";
    width: "90%";
`;

type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, "Login">;

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
        <Container>
            {assets ? <Logo source={assets[0] as ImageSourcePropType} /> : null}

            <LoginInputs
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                isDisabled={isLoading}
            />

            {error ? <ErrorText>{error}</ErrorText> : null}

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
        </Container>
    );
};

export default LoginScreen;
