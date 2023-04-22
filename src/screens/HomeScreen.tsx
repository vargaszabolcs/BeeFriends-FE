import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import BFButton from "../components/common/BFButton";
import BFScreen from "../components/common/BFScreen";
import HivesContainer from "../components/home/HivesContainer";
import WelcomeContainer from "../components/home/WelcomeContainer";
import { BeehiveData, MainStackParamList } from "../types";

type Prop = NativeStackScreenProps<MainStackParamList, "Home">;

const HomeScreen = ({ navigation }: Prop) => {
    const onHivePress = (hive: BeehiveData) => {
        navigation.navigate("HiveDetails", { hive });
    };

    return (
        <BFScreen applyPadding>
            <WelcomeContainer />
            <HivesContainer onHivePress={onHivePress} />
            <BFButton
                title={"Add new hive"}
                onPress={() => navigation.navigate("NewHive")}
            />
        </BFScreen>
    );
};

export default HomeScreen;
