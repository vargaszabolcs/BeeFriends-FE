import { SafeAreaView } from "react-native";
import React from "react";
import styled from "styled-components";
import HivesContainer from "../components/home/HivesContainer";

const Container = styled(SafeAreaView)`
    flex: 1;
`;

const HomeScreen = () => {
    return (
        <Container>
            <HivesContainer />
        </Container>
    );
};

export default HomeScreen;
