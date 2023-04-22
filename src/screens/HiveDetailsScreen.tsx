import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import { MainStackParamList } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "HiveDetails">;

const HiveDetailsScreen: React.FC<Props> = ({
    route: {
        params: { hive },
    },
}) => (
    <BFScreen applyPadding>
        <BFTitle
            title={hive.name}
            style={{ marginBottom: 5 }}
        />
        <View style={[styles.horizontalLine, { borderColor: hive.color }]} />
        <Text style={styles.text}>Number: {hive.assigned_number}</Text>
        <Text style={styles.text}>Description: {hive.description}</Text>
        <Text style={styles.text}>Location: {hive.location}</Text>
        <Text style={styles.text}>Population: {hive.population}</Text>
        <Text style={styles.text}>Birthday: {new Date(hive.birthday).toLocaleDateString()}</Text>
    </BFScreen>
);

export default HiveDetailsScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
    horizontalLine: {
        borderBottomWidth: 10,
        marginBottom: 20,
    },
});
