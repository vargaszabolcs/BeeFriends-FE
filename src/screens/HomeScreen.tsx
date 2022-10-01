import { SafeAreaView } from "react-native";
import React from "react";
import styled from "styled-components";
import HivesContainer from "../components/home/HivesContainer";
import WelcomeContainer from "../components/home/WelcomeContainer";

const Container = styled(SafeAreaView)`
    flex: 1;
`;

const HomeScreen = () => (
    <Container>
        <WelcomeContainer />
        <HivesContainer />
    </Container>
);

export default HomeScreen;
