import FeatherIcon from "@expo/vector-icons/Feather";
import React, { FC } from "react";
import { Pressable } from "react-native";
import styled from "styled-components";

interface IHeaderButtonProps {
    onClick: () => void;
}

const Button = styled(Pressable)``;

const Icon = styled(FeatherIcon)`
    font-size: 20px;
`;

const HeaderButton: FC<IHeaderButtonProps> = props => (
    <Button onPress={props.onClick}>
        <Icon name="settings" />
    </Button>
);

export default HeaderButton;
