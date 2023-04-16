import React from "react";
import BFScreen from "../components/common/BFScreen";
import HivesContainer from "../components/home/HivesContainer";
import WelcomeContainer from "../components/home/WelcomeContainer";

const HomeScreen = () => (
    <BFScreen applyPadding>
        <WelcomeContainer />
        <HivesContainer />
    </BFScreen>
);

export default HomeScreen;
