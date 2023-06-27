import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
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

    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async () => {
        if (!type || !amount || !description) {
            return;
        }

        setLoading(true);
        try {
            const res = await apiClient.post(`/beehive/${hiveId}/records`, {
                type,
                amount,
                description,
            });
            if (res) {
                navigation.goBack();
            }
        } catch (error) {
            console.log("Error creating new hive:", error);
        }
    };

    return (
        <BFScreen applyPadding>
            <BFTitle title="Add New Record" />
            <Text style={styles.label}>Type</Text>
            <Picker
                selectedValue={type}
                onValueChange={itemValue => setType(itemValue)}
                itemStyle={{ fontSize: 16 }}
            >
                <Picker.Item
                    label={RecordType.HARVEST}
                    value={RecordType.HARVEST}
                />
                <Picker.Item
                    label={RecordType.FEEDING}
                    value={RecordType.FEEDING}
                />
                <Picker.Item
                    label={RecordType.TREATMENT}
                    value={RecordType.TREATMENT}
                />
                <Picker.Item
                    label={RecordType.INSPECTION}
                    value={RecordType.INSPECTION}
                />
                <Picker.Item
                    label={RecordType.OTHER}
                    value={RecordType.OTHER}
                />
            </Picker>
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
