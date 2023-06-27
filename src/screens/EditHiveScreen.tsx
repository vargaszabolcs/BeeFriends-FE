import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView } from "react-native";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import apiClient from "../network/apiClient";
import { MainStackParamList } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "EditHive">;

const API_URL = "/beehive";

interface FormData {
    name: string;
    location: string;
    description: string;
    color: string;
    assigned_number: number;
    population: number;
}

const EditHiveScreen: React.FC<Props> = ({ navigation, route }) => {
    const { control, handleSubmit, setValue } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const hiveId = route.params.hiveId;

    useEffect(() => {
        const fetchHiveDetails = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`${API_URL}/:id`.replace(":id", hiveId));
                const data = response.data;
                if (data.error) {
                    Alert.alert("Error", data.error);
                } else {
                    Object.keys(data).forEach(key => setValue(key as keyof FormData, data[key]));
                }
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };
        fetchHiveDetails();
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            const response = await apiClient.post(
                `${API_URL}/:id`.replace(":id", hiveId),
                JSON.stringify(data),
            );
            console.log(JSON.stringify(response, null, 2));

            const result = response.data;
            if (result.error) {
                Alert.alert("Error", result.error);
            } else {
                Alert.alert("Success", "Hive updated successfully!");
                navigation.goBack();
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong!");
        }
    };

    return (
        <BFScreen applyPadding>
            <ScrollView>
                <BFTitle title="Edit Hive" />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="Name"
                            onChangeText={onChange}
                            value={value}
                            label={"Name"}
                        />
                    )}
                    name="name"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="Location"
                            onChangeText={onChange}
                            value={value}
                            label={"Location"}
                        />
                    )}
                    name="location"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="Description"
                            onChangeText={onChange}
                            value={value}
                            label={"Description"}
                        />
                    )}
                    name="description"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="Assigned Number"
                            onChangeText={onChange}
                            value={value.toString()}
                            label={"Number"}
                            keyboardType="numeric"
                        />
                    )}
                    name="assigned_number"
                    defaultValue={0}
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="Population"
                            onChangeText={onChange}
                            value={value.toString()}
                            label={"Population"}
                            keyboardType="numeric"
                        />
                    )}
                    name="population"
                    defaultValue={0}
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            value={value}
                            placeholder="Color"
                            onChangeText={onChange}
                            contentType="color"
                            label={"Color"}
                        />
                    )}
                    name="color"
                    defaultValue=""
                />
                <BFButton
                    title="Update Hive"
                    onPress={handleSubmit(onSubmit)}
                    isDisabled={loading}
                />
            </ScrollView>
        </BFScreen>
    );
};

export default EditHiveScreen;
