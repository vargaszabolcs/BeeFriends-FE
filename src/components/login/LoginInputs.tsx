import React from "react";
import InputField from "./InputField";

interface ILoginInputsProps {
    email: string,
    onEmailChange: (email: string) => void,
    password: string,
    onPasswordChange: (password: string) => void,
    isDisabled?: boolean,
}

const LoginInputs: React.FC<ILoginInputsProps> = ({email, password, onEmailChange, onPasswordChange, isDisabled = false}) => (
    <>
        <InputField value={email} onChangeText={onEmailChange} isDisabled={isDisabled} type={"email"} placeholder={"Email"} />
        <InputField value={password} onChangeText={onPasswordChange} isDisabled={isDisabled} type={"password"} placeholder={"Password"} />
    </>
);

export default LoginInputs;
