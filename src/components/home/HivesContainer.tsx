import axios, { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Network from "../../constants/Network";
import { RootState } from "../../store/store";
import { BeehiveData } from "../../types";
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
            <FlatList
                data={hivesData}
                renderItem={({ item }) => <HiveCard {...item} />}
                keyExtractor={item => item._id}
            />
        </Container>
    );
};

export default HivesContainer;
