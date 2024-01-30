import Feather from "@expo/vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useMemo } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BFButton from "../components/common/BFButton";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import apiClient from "../network/apiClient";
import { BeehiveData, MainStackParamList, RecordData } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "HiveDetails">;

const HiveDetailsScreen: React.FC<Props> = ({
    route: {
        params: { hive },
    },
    navigation,
}) => {
    const [records, setRecords] = React.useState<RecordData[]>([]);
    const [currentHive, setCurrentHive] = React.useState(hive);

    const getRecords = useCallback(async () => {
        const data: AxiosResponse<BeehiveData> = await apiClient.get(`/beehive/${hive._id}`);
        setCurrentHive(data.data);

        const records: AxiosResponse<RecordData[]> = await apiClient.get(
            `/beehive/${hive._id}/records`,
        );
        setRecords(records.data);

        console.log(
            "🚀 ~ file: HiveDetailsScreen.tsx:30 ~ getRecords ~ records.data:",
            records.data,
        );
    }, [hive._id, setRecords, setCurrentHive]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getRecords();
        });

        return unsubscribe;
    }, []);

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

    const profit = useMemo(
        () =>
            records.reduce((acc, record) => {
                acc += record.amount;
                return acc;
            }, 0),
        [records],
    );

    const showDeletePopup = useCallback(
        (recordId: string) => {
            Alert.alert(
                "Delete record",
                "Are you sure you want to delete this record?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            try {
                                await apiClient.delete(`/beehive/${hive._id}/records/${recordId}`);
                                getRecords();
                            } catch (error) {
                                console.log(error);
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        },
        [getRecords, hive._id],
    );

    return (
        <BFScreen applyPadding>
            <ScrollView>
                <BFTitle
                    title={currentHive.name}
                    style={{ marginBottom: 5 }}
                />
                <View style={[styles.horizontalLine, { borderColor: currentHive.color }]} />
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Assigned Number:</Text>
                        <Text style={styles.value}>{currentHive.assigned_number}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.value}>{currentHive.description}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Location:</Text>
                        <Text style={styles.value}>{currentHive.location}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Population:</Text>
                        <Text style={styles.value}>{currentHive.population}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Birthday:</Text>
                        <Text style={styles.value}>
                            {new Date(currentHive.birthday).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Profit:</Text>
                        <Text style={styles.value}>{profit}</Text>
                    </View>
                    <BFTitle
                        title={"Records"}
                        style={{ marginTop: 25, marginBottom: 5, fontSize: 22 }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <BFButton
                            title={"Add income +"}
                            onPress={() =>
                                navigation.navigate("NewRecord", {
                                    hiveId: hive._id,
                                    balanceType: "INCOME",
                                })
                            }
                        />
                        <BFButton
                            title={"Add expense -"}
                            onPress={() =>
                                navigation.navigate("NewRecord", {
                                    hiveId: hive._id,
                                    balanceType: "EXPENSE",
                                })
                            }
                        />
                    </View>
                    {records.length > 0 && (
                        <View style={styles.row}>
                            <Text style={styles.recordTextHeader}>Date</Text>
                            <Text style={styles.recordTextHeader}>Description</Text>
                            <Text style={[styles.recordTextHeader, { textAlign: "right" }]}>
                                Amount
                            </Text>
                            <Text style={[styles.recordTextHeader, { textAlign: "right" }]}>
                                Type
                            </Text>
                        </View>
                    )}
                    {records.length > 0 &&
                        records.map(record => (
                            <TouchableOpacity
                                style={styles.row}
                                key={record._id}
                                onPress={showDeletePopup.bind(this, record._id)}
                            >
                                <Text style={styles.recordText}>
                                    {new Date(record.date).toLocaleDateString()}
                                </Text>
                                <Text style={styles.recordText}>{record.description}</Text>
                                <Text
                                    style={[
                                        styles.recordText,
                                        {
                                            textAlign: "right",
                                            color: record.amount > 0 ? "green" : "red",
                                        },
                                    ]}
                                >
                                    {record.amount}
                                </Text>
                                <Text style={[styles.recordText, { textAlign: "right" }]}>
                                    {record.type}
                                </Text>
                            </TouchableOpacity>
                        ))}
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
    recordText: {
        fontSize: 14,
        flex: 1,
    },
    recordTextPositive: {
        color: "green",
    },
    recordTextHeader: {
        fontSize: 14,
        fontWeight: "bold",
        flex: 1,
    },
});
