import React from "react";
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
    <>
        <BFInputField
            value={email}
            onChangeText={onEmailChange}
            isDisabled={isDisabled}
            type={"email"}
            placeholder={"Email"}
            autoCapitalize={"none"}
        />
        <BFInputField
            value={password}
            onChangeText={onPasswordChange}
            isDisabled={isDisabled}
            type={"password"}
            placeholder={"Password"}
            autoCapitalize={"none"}
        />
    </>
);

export default LoginInputs;
