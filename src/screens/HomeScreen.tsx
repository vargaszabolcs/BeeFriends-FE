import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import BFButton from "../components/common/BFButton";
import BFScreen from "../components/common/BFScreen";
import HivesContainer from "../components/home/HivesContainer";
import WelcomeContainer from "../components/home/WelcomeContainer";
import { MainStackParamList } from "../types";

type Prop = NativeStackScreenProps<MainStackParamList, "Home">;

const HomeScreen = ({ navigation }: Prop) => (
    <BFScreen applyPadding>
        <WelcomeContainer />
        <HivesContainer />
        <BFButton
            title={"Add new hive"}
            onPress={() => navigation.navigate("NewHive")}
        />
    </BFScreen>
);

export default HomeScreen;
