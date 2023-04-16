import { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import apiClient from "../../network/apiClient";
import { BeehiveData } from "../../types";
import BFButton from "../common/BFButton";
import BFTitle from "../common/BFTitle";
import HiveCard from "./HiveCard";

const HivesContainer: FC = () => {
    const [hivesData, setHivesData] = useState<BeehiveData[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data: AxiosResponse<BeehiveData[]> = await apiClient.get("/beehive");
                setHivesData(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    return (
        <View style={styles.container}>
            <BFTitle
                title={"My hives"}
                style={styles.title}
            />
            {hivesData.length > 0 ? (
                <FlatList
                    data={hivesData}
                    renderItem={({ item }) => <HiveCard {...item} />}
                    keyExtractor={item => item._id}
                />
            ) : (
                <Text>You haven&apos;t added a hive yet. Click the button to start buzzing!</Text>
            )}
            <BFButton
                title={"Add new hive"}
                onPress={() => console.log("Add new hive")}
            />
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
    },
});

export default HivesContainer;
