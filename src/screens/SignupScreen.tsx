import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import InputField from "../components/login/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../components/login/SubmitButton";
import axios, { AxiosResponse } from "axios";
import Network from "../constants/Network";
import { IUser, LoginResponse, LoginStackParamList } from "../types";
import ExtraLink from "../components/login/ExtraLink";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { useDispatch } from "react-redux";
import { logIn } from "../store/appSlice";

type ISignupScreenProps = NativeStackScreenProps<LoginStackParamList, "Signup">;

const SignupScreen: React.FC<ISignupScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [name, setName] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const verifyData = (email: string, password: string, rePassword: string, name: string) => {
        if (email === "") {
            setError("Please enter an email address!");
            return false;
        } else {
            const emailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address!");
                return false;
            }
        }

        if (password === "") {
            setError("Please enter a password!");
            return false;
        } else if (password.length < 6) {
            setError("Please enter a password with at least 6 characters!");
            return false;
        }

        if (rePassword === "") {
            setError("Please repeat your password!");
            return false;
        }
        if (name === "") {
            setError("Please enter your name!");
            return false;
        } else if (name.length < 3) {
            setError("Please enter a name with at least 3 characters!");
            return false;
        }

        if (password !== rePassword) {
            setError("Passwords do not match!");
            return false;
        }

        return true;
    };

    const onSubmit = async () => {
        setIsLoading(true);

        if (!verifyData(email, password, passwordRepeat, name)) {
            setIsLoading(false);
            return;
        }

        const data = { email, password, full_name: name };
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(
                Network.API_URL + "/auth/signup",
                data,
                { timeout: 5000 },
            );

            if (response.data.error) {
                setError(response.data.error);
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
            setIsLoading(false);
        } catch (err) {
            setError(
                "Something went wrong. Please try again later and check your internet connection!",
            );
            console.error(err);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <InputField
                value={email}
                onChangeText={setEmail}
                isDisabled={isLoading}
                type="email"
                placeholder="Email"
            />
            <InputField
                value={password}
                onChangeText={setPassword}
                isDisabled={isLoading}
                type="password"
                placeholder="Password"
            />
            <InputField
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                isDisabled={isLoading}
                type="password"
                placeholder="Repeat Password"
            />
            <InputField
                value={name}
                onChangeText={setName}
                isDisabled={isLoading}
                type="name"
                placeholder="Name"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <SubmitButton
                text="Submit"
                onPress={onSubmit}
                isDisabled={isLoading}
            />
            <ExtraLink
                text="I already have an account"
                onPress={navigation.goBack}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    error: {
        color: "red",
        width: "90%",
    },
});

export default SignupScreen;
