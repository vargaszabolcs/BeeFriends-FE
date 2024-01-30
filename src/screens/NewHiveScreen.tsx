import { yupResolver } from "@hookform/resolvers/yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import apiClient from "../network/apiClient";
import { MainStackParamList } from "../types";

interface NewHiveFormValues {
    name: string;
    location: string;
    description: string;
    color: string;
    assigned_number: string;
    population: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string(),
    color: Yup.string().required("Color is required"),
    assigned_number: Yup.number().required("Assigned number is required").positive().integer(),
    population: Yup.number().required("Population is required").positive().integer(),
});

type Props = NativeStackScreenProps<MainStackParamList, "NewHive">;

export const NewHiveScreen: React.FC<Props> = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewHiveFormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (values: NewHiveFormValues) => {
        try {
            const res = await apiClient.post("/beehive", values);
            if (res) {
                navigation.navigate("Home");
            }
        } catch (error) {
            console.log("Error creating new hive:", error);
        }
        console.log("New hive values:", values);
    };

    return (
        <BFScreen applyPadding>
            <ScrollView style={styles.scrollContainer}>
                <BFTitle title="Add New Hive" />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            contentType="name"
                            placeholder="Green Hive 12"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                            label="Name"
                        />
                    )}
                    name="name"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="Street 123"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.location?.message}
                            label={"Location"}
                        />
                    )}
                    name="location"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="This is my favorite hive"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.description?.message}
                            label={"Description"}
                        />
                    )}
                    name="description"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="1"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
                            errorMessage={errors.assigned_number?.message}
                            label={"Assigned Number"}
                        />
                    )}
                    name="assigned_number"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="100"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
                            errorMessage={errors.population?.message}
                            label={"Population"}
                        />
                    )}
                    name="population"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <BFInputField
                            placeholder="Color"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.color?.message}
                            contentType="color"
                            label={"Color"}
                        />
                    )}
                    name="color"
                />
                <BFButton
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                />
            </ScrollView>
        </BFScreen>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
});

export default NewHiveScreen;
