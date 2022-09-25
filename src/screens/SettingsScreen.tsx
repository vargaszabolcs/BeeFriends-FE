import { Pressable, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/appSlice";
import { removeLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";

const SettingsScreen = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await removeLocalData(StorageKeys.USER_DATA, true);
        dispatch(logOut());
    };

    return (
        <View>
            <Pressable onPress={handleLogout.bind(this)}>
                <Text>Log Out</Text>
            </Pressable>
        </View>
    );
};

export default SettingsScreen;
