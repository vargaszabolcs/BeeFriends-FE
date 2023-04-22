import FeatherIcon from "@expo/vector-icons/Feather";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

interface IHeaderButtonProps {
    onClick: () => void;
}

const Icon = styled(FeatherIcon)`
    font-size: 22px;
`;

const HeaderButton: FC<IHeaderButtonProps> = props => (
    <TouchableOpacity onPress={props.onClick}>
        <Icon name="settings" />
    </TouchableOpacity>
);

export default HeaderButton;
