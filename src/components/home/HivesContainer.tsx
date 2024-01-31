import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import apiClient from "../../network/apiClient";
import { BeehiveData, RecordData } from "../../types";
import BFTitle from "../common/BFTitle";
import HiveCard from "./HiveCard";

type Props = {
    onHivePress: (hive: BeehiveData) => void;
};

const HivesContainer: FC<Props> = ({ onHivePress }) => {
    const [hivesData, setHivesData] = useState<BeehiveData[]>([]);
    const [records, setRecords] = useState<RecordData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRecordsLoading, setIsRecordsLoading] = useState<boolean>(false);

    const getRecords = async (hives: BeehiveData[]) => {
        setRecords([]);
        setIsRecordsLoading(true);
        for (const hive of hives) {
            const recordsData: AxiosResponse<RecordData[]> = await apiClient.get(
                `/beehive/${hive._id}/records`,
            );
            setRecords(value => [...value, ...recordsData.data]);
        }
        setIsRecordsLoading(false);
    };

    const getData = async () => {
        try {
            setIsLoading(true);
            const data: AxiosResponse<BeehiveData[]> = await apiClient.get("/beehive");
            setHivesData(data.data);
            getRecords(data.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            // do it in the BG
            const data: AxiosResponse<BeehiveData[]> = await apiClient.get("/beehive");
            setHivesData(data.data);

            getRecords(data.data);
        });

        return unsubscribe;
    }, [getData, navigation]);

    // Get all negative amounts from hivesData
    const expense = records.reduce((acc, record) => {
        if (record.amount < 0) {
            acc += record.amount;
        }
        return acc;
    }, 0);

    const income = records.reduce((acc, record) => {
        if (record.amount > 0) {
            acc += record.amount;
        }
        return acc;
    }, 0);

    return (
        <View style={styles.container}>
            <View>
                <BFTitle
                    title="Balance overview"
                    style={{ marginBottom: 6, marginTop: 12 }}
                />
                {!isRecordsLoading ? (
                    <>
                        <Text>Income: {income}</Text>
                        <Text>Expense: {expense}</Text>
                        <Text style={{ fontWeight: "bold" }}>Profit: {income + expense}</Text>
                    </>
                ) : (
                    <ActivityIndicator size={40} />
                )}
            </View>
            <BFTitle
                title={"My hives"}
                style={styles.title}
            />
            {hivesData.length > 0 ? (
                <FlatList
                    data={hivesData}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onHivePress(item)}>
                            <HiveCard {...item} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                    onRefresh={getData}
                    refreshing={isLoading}
                />
            ) : (
                <Text>You haven&apos;t added a hive yet. Click the button to start buzzing!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginBottom: 10,
    },
    container: {
        flexDirection: "column",
        flex: 1,
    },
});

export default HivesContainer;
