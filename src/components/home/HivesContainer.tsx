import axios, { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Network from "../../constants/Network";
import { RootState } from "../../store/store";
import { BeehiveData } from "../../types";
import BFTitle from "../common/BFTitle";
import HiveCard from "./HiveCard";

const Container = styled(SafeAreaView)`
    flex: 1;
    flex-direction: column;
    padding: 10px;
`;

const HivesContainer: FC = () => {
    const [hivesData, setHivesData] = useState<BeehiveData[]>([]);

    const userData = useSelector((state: RootState) => state.app.userData);
    const getData = async () => {
        try {
            const data: AxiosResponse<BeehiveData[]> = await axios.get(
                Network.API_URL + "/beehive",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userData?.token}`,
                    },
                },
            );
            setHivesData(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            <BFTitle
                title={"My hives"}
                style={styles.title}
            />
            <FlatList
                data={hivesData}
                renderItem={({ item }) => <HiveCard {...item} />}
                keyExtractor={item => item._id}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    title: {
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 10,
    },
});

export default HivesContainer;
