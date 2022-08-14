
import { Pressable } from "react-native";
import React, { FC } from "react";
import styled from "styled-components";
import FeatherIcon from "@expo/vector-icons/Feather";

interface ISubmitButtonProps {
    onClick: () => void,
}

const Button = styled(Pressable)`
`;

const Icon = styled(FeatherIcon)`
    fontSize: 20px;
`;

const SettingsButton: FC<ISubmitButtonProps> = (props) => {
    return (
        <Button
            onPress={props.onClick}
        >
            <Icon name="settings"/>
        </Button>
    );
};

export default SettingsButton;