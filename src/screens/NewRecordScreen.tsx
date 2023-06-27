import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import { MainStackParamList } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "NewRecord">;

export interface FormRecordData {
    type: string;
    amount: number;
    description: string;
}

const NewRecordScreen: React.FC<Props> = ({ route }) => {
    const { control } = useForm<FormRecordData>();
    // const [loading, setLoading] = useState(false);
    const hiveId = route.params.hiveId;

    return (
        <BFScreen applyPadding>
            <BFTitle title="Add New Record" />
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <BFInputField
                        placeholder="Type"
                        onChangeText={onChange}
                        value={value}
                        label={"Type"}
                    />
                )}
                type="type"
            />
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <BFInputField
                        placeholder="Amount"
                        onChangeText={onChange}
                        value={value}
                        label={"Amount"}
                    />
                )}
                type="amount"
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
                type="description"
            />
        </BFScreen>
    );
};

export default NewRecordScreen;

const styles = StyleSheet.create({});
