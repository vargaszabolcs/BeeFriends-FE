import { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import apiClient from "../../network/apiClient";
import { BeehiveData } from "../../types";
import BFTitle from "../common/BFTitle";
import HiveCard from "./HiveCard";

type Props = {
    onHivePress: (hive: BeehiveData) => void;
};

const HivesContainer: FC<Props> = ({ onHivePress }) => {
    const [hivesData, setHivesData] = useState<BeehiveData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data: AxiosResponse<BeehiveData[]> = await apiClient.get("/beehive");
            setHivesData(data.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
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
