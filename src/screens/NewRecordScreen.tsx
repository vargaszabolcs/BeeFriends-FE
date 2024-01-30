import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import apiClient from "../network/apiClient";
import { MainStackParamList, RecordType } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "NewRecord">;

export interface FormRecordData {
    type: string;
    amount: number;
    description: string;
}

const NewRecordScreen: React.FC<Props> = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const hiveId = route.params.hiveId;
    const balanceType = route.params.balanceType;

    const [type, setType] = useState(RecordType.SALE_HONEY);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async () => {
        if (!type || !amount) {
            return;
        }

        setLoading(true);

        let newAmount = parseFloat(amount);
        if (
            type !== RecordType.SALE_HONEY &&
            type !== RecordType.SALE_BEESWAX &&
            type !== RecordType.SALE_PROPOLIS
        ) {
            newAmount = -newAmount;
        }
        try {
            const res = await apiClient.post(`/beehive/${hiveId}/records`, {
                type,
                amount: newAmount,
                description,
            });
            if (res) {
                navigation.goBack();
            }
        } catch (error) {
            console.log("Error creating new hive:", error);
        }
    };

    const incomeItems = [
        { label: RecordType.SALE_HONEY, value: RecordType.SALE_HONEY },
        { label: RecordType.SALE_BEESWAX, value: RecordType.SALE_BEESWAX },
        { label: RecordType.SALE_PROPOLIS, value: RecordType.SALE_PROPOLIS },
    ];

    const expenseItems = [
        { label: RecordType.FEEDING, value: RecordType.FEEDING },
        { label: RecordType.TREATMENT, value: RecordType.TREATMENT },
        {
            label: RecordType.INSPECTION,
            value: RecordType.INSPECTION,
        },
    ];

    const selectItems = balanceType === "INCOME" ? incomeItems : expenseItems;

    return (
        <BFScreen applyPadding>
            <BFTitle title="Add New Record" />
            <Text style={styles.label}>
                {balanceType === "INCOME" ? "Sale Type" : "Expense Type"}
            </Text>
            <RNPickerSelect
                onValueChange={setType}
                placeholder={{}}
                value={type}
                style={pickerSelectStyles}
                items={selectItems}
            />
            <BFInputField
                placeholder="0"
                onChangeText={setAmount}
                value={amount}
                label={"Amount"}
            />
            <BFInputField
                placeholder="First annual harvest"
                onChangeText={setDescription}
                value={description}
                label={"Description"}
            />
            <BFButton
                title="Save"
                onPress={onSubmit}
                isDisabled={loading}
            />
        </BFScreen>
    );
};

export default NewRecordScreen;

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        padding: 5,
        backgroundColor: "#c2e3ff",
        borderRadius: 7,
        color: "black",
        minHeight: 40,
        marginBottom: 10,
        marginTop: 5,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 18,
        minHeight: 40,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "#c2e3ff",
        borderRadius: 7,
        color: "black",
        marginBottom: 10,
        marginTop: 5,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
