import Feather from "@expo/vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import { MainStackParamList } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "HiveDetails">;

const HiveDetailsScreen: React.FC<Props> = ({
    route: {
        params: { hive },
    },
    navigation,
}) => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("EditHive", { hiveId: hive._id })}>
                <Feather
                    name="edit"
                    size={22}
                    color="black"
                />
            </TouchableOpacity>
        ),
    });
    return (
        <BFScreen applyPadding>
            <ScrollView>
                <BFTitle
                    title={hive.name}
                    style={{ marginBottom: 5 }}
                />
                <View style={[styles.horizontalLine, { borderColor: hive.color }]} />
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Assigned Number:</Text>
                        <Text style={styles.value}>{hive.assigned_number}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.value}>{hive.description}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Location:</Text>
                        <Text style={styles.value}>{hive.location}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Population:</Text>
                        <Text style={styles.value}>{hive.population}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Birthday:</Text>
                        <Text style={styles.value}>
                            {new Date(hive.birthday).toLocaleDateString()}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </BFScreen>
    );
};

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
    table: {
        borderWidth: 0,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    label: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
    },
    value: {
        flex: 2,
        fontSize: 18,
    },
});
