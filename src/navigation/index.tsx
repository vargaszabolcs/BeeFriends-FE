import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { logIn } from "../store/appSlice";
import { RootState, store } from "../store/store";

import { RootStackParamList } from "../types";
import LoginScreenStack from "./loginStack";
import MainStack from "./mainStack";

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

const checkLocalStorageForUserData = async () => {
    const userData = await getLocalData(StorageKeys.USER_DATA, true);
    if (userData) {
        store.dispatch(logIn(JSON.parse(userData)));
    }
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    useEffect(() => {
        checkLocalStorageForUserData();
    }, []);

    const userData = useSelector((state: RootState) => state.app.userData);

    console.log("userData", userData);

    return (
        <RootStack.Navigator initialRouteName="LoginStack">
            {!userData?.token ? (
                <RootStack.Screen
                    name="LoginStack"
                    component={LoginScreenStack}
                    options={{ headerShown: false }}
                />
            ) : (
                <RootStack.Screen
                    name="MainTabNavigator"
                    component={MainStack}
                    options={{ headerShown: false }}
                />
            )}
        </RootStack.Navigator>
    );
}
