import React, { FC } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../constants/Colors";
import { BeehiveData } from "../../types";

const Container = styled.View`
    padding: 10px;
    background-color: #d3d3d3;
    border-radius: 5px;
    flex-direction: row;
`;

interface IColoredShapeProps {
    color: string;
}

const ColoredShape = styled.View<IColoredShapeProps>`
    width: 100%;
    height: 10%;
    background-color: ${props => props.color};
`;

const BigNumber = styled.Text`
    font-size: 60px;
    margin-right: 10px;
`;

const Details = styled.View`
    flex-direction: column;
    flex: 1;
`;

const Name = styled.Text`
    font-size: 20px;
`;

const DetailsRow = styled.View`
    flex-direction: row;
`;

const DetailsLabel = styled.Text`
    margin-right: 10px;
    color: ${colors.grey};
    font-size: 14px;
`;

const DetailsValue = styled.Text`
    font-size: 14px;
`;

const HiveCard: FC<BeehiveData> = props => (
    <Container>
        <BigNumber>
            {props.assigned_number < 10 ? `0${props.assigned_number}` : props.assigned_number}
        </BigNumber>
        <Details>
            <Name>{props.name}</Name>
            {props.description && <Text>{props.description}</Text>}
            <DetailsRow>
                <DetailsLabel>Population</DetailsLabel>
                <DetailsValue>{props.population}</DetailsValue>
            </DetailsRow>
            <DetailsRow>
                <DetailsLabel>Location</DetailsLabel>
                <DetailsValue>{props.location}</DetailsValue>
            </DetailsRow>
            <ColoredShape color={props.color} />
        </Details>
    </Container>
);

export default HiveCard;
