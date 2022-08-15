import axios, { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Network from "../../constants/Network";
import { BeehiveData, IStoreState } from "../../types";
import HiveCard from "./HiveCard";


const Container = styled(SafeAreaView)`
    flex: 1;
    flex-direction: column;
    padding: 10px;
`;

const HivesContainer: FC = () => {
    const [hivesData, setHivesData] = useState<BeehiveData[]>([]);

    const userData = useSelector<IStoreState, IStoreState["userData"]>(state => state.userData);
    const getData = async () => {
        try {
            const data: AxiosResponse<BeehiveData[]> = await axios.get(Network.API_URL + "/beehive", {headers: {"Authorization": `Bearer ${userData?.token}`}});
            setHivesData(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("finally");
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
                keyExtractor={(item) => item._id}
            />
        </Container>
    );
};

export default HivesContainer;