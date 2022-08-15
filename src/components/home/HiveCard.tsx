import React, { FC } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { BeehiveData } from "../../types";

const Container = styled.View`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #D3D3D3;
    border-radius: 5px;
`;

interface IColoredShapeProps {
    color: string;
}
const ColoredShape = styled.View<IColoredShapeProps>`
    width: 100%;
    height: 10%;
    background-color: ${props => props.color};
`;

const HiveCard: FC<BeehiveData> = (props) => {
    return (
        <Container>
            <Text>{props.assigned_number}</Text>
            <Text>{props.name}</Text>
            <Text>{props.description}</Text>
            <Text>{props.population}</Text>
            <Text>{props.location}</Text>
            <ColoredShape color={props.color}/>
        </Container>
    );
};

export default HiveCard;