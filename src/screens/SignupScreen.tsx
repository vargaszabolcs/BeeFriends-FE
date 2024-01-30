import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import ExtraLink from "../components/login/ExtraLink";
import SubmitButton from "../components/login/SubmitButton";
import apiClient from "../network/apiClient";
import { logIn } from "../store/authSlice";
import { AuthStackParamList, IUser, LoginResponse } from "../types";

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, "Signup">;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
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
            const response: AxiosResponse<LoginResponse> = await apiClient.post(
                "/auth/signup",
                data,
            );

            if (response.data.error) {
                setError(response.data.error);
            } else {
                setError("");
                const userData: IUser = response.data;
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
        <BFScreen
            hasNoHeader
            applyPadding
        >
            <Text style={styles.title}>Sign Up</Text>
            <BFInputField
                value={email}
                onChangeText={setEmail}
                isDisabled={isLoading}
                contentType="email"
                placeholder="Email"
            />
            <BFInputField
                value={password}
                onChangeText={setPassword}
                isDisabled={isLoading}
                contentType="password"
                placeholder="Password"
            />
            <BFInputField
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                isDisabled={isLoading}
                contentType="password"
                placeholder="Repeat Password"
            />
            <BFInputField
                value={name}
                onChangeText={setName}
                isDisabled={isLoading}
                contentType="name"
                placeholder="Name"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.textContainer}>
                <SubmitButton
                    text="Submit"
                    onPress={onSubmit}
                    isDisabled={isLoading}
                />
                <ExtraLink
                    text="I already have an account"
                    onPress={navigation.goBack}
                />
            </View>
        </BFScreen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    error: {
        color: "red",
        width: "90%",
    },
    textContainer: {
        alignItems: "center",
    },
});

export default SignupScreen;
