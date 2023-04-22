import React from "react";
import { View } from "react-native";
import BFInputField from "../common/BFInputField";

interface ILoginInputsProps {
    email: string;
    onEmailChange: (email: string) => void;
    password: string;
    onPasswordChange: (password: string) => void;
    isDisabled?: boolean;
}

const LoginInputs: React.FC<ILoginInputsProps> = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    isDisabled = false,
}) => (
    <View style={{ width: "100%" }}>
        <BFInputField
            value={email}
            onChangeText={onEmailChange}
            isDisabled={isDisabled}
            contentType={"email"}
            placeholder={"Email"}
            autoCapitalize={"none"}
        />
        <BFInputField
            value={password}
            onChangeText={onPasswordChange}
            isDisabled={isDisabled}
            contentType={"password"}
            placeholder={"Password"}
            autoCapitalize={"none"}
        />
    </View>
);

export default LoginInputs;
