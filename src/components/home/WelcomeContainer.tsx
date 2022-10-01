import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { RootState } from "../../store/store";

const Container = styled.View`
    padding: 10px;
`;

const WelcomeTextContainer = styled.View`
    flex-direction: row;
`;

const WelcomeText = styled.Text`
    font-size: 20px;
`;

const WelcomeTextName = styled(WelcomeText)`
    font-weight: bold;
`;

const WelcomeContainer = () => {
    const userData = useSelector((state: RootState) => state.app.userData);

    return (
        <Container>
            <WelcomeTextContainer>
                <WelcomeText>Welcome, </WelcomeText>
                <WelcomeTextName>{userData?.full_name}</WelcomeTextName>
                <WelcomeText>!</WelcomeText>
            </WelcomeTextContainer>
        </Container>
    );
};

export default WelcomeContainer;
