import { Pressable, Text, View } from "react-native";
import React from "react";
import store from "../store/store";
import { loggedOut } from "../store/actions";

const SettingsScreen = () => (
    <View>
        <Pressable onPress={() => store.dispatch(loggedOut())}>
            <Text>Log Out</Text>
        </Pressable>
    </View>
);

export default SettingsScreen;
