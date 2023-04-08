import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { useDispatch, useStore } from "react-redux";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import { deleteAccountAsync } from "../store/appSlice";
import { AppDispatch, RootState } from "../store/store";
import { MainStackParamList } from "../types";

type Props = NativeStackScreenProps<MainStackParamList, "DeleteAccount">;

const DeleteAccountScreen: React.FC<Props> = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const store = useStore<RootState>();

    const handleDelete = async () => {
        setIsLoading(true);

        const userId = store.getState().app.userData?.id;
        if (!userId) {
            return;
        }

        const result = await dispatch(deleteAccountAsync(userId, password));

        if (result.error) {
            Alert.alert("Error deleting account!", result.error, [
                {
                    text: "OK",
                },
            ]);
        } else {
            Alert.alert("Account deleted successfully!", undefined, [
                {
                    text: "OK",
                },
            ]);
        }

        setIsLoading(false);
    };

    return (
        <BFScreen applyPadding>
            <BFTitle title="Delete Account" />
            <Text style={styles.warningText}>
                Warning: Deleting your account is permanent and cannot be undone.
            </Text>
            <BFInputField
                placeholder="Current Password"
                value={password}
                onChangeText={setPassword}
                type="password"
                isDisabled={isLoading}
                autoCapitalize="none"
            />
            <BFButton
                title="Delete Account"
                onPress={handleDelete}
                isDisabled={isLoading}
            />
        </BFScreen>
    );
};

const styles = StyleSheet.create({
    warningText: {
        fontWeight: "bold",
    },
});

export default DeleteAccountScreen;
