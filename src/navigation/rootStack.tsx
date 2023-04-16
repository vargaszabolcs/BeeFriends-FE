import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { logIn } from "../store/authSlice";
import { RootState, store } from "../store/store";
import { RootStackParamList } from "../types";
import LoginScreenStack from "./authStack";
import MainStack from "./mainStack";

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    useEffect(() => {
        const checkLocalStorageForUserData = async () => {
            const userData = await getLocalData(StorageKeys.USER_DATA, true);
            if (userData) {
                store.dispatch(logIn(JSON.parse(userData)));
            }
        };

        checkLocalStorageForUserData();
    }, []);

    const userData = useSelector((state: RootState) => state.app.userData);

    // console.log("userData", userData);

    return (
        <RootStack.Navigator
            initialRouteName="AuthStack"
            screenOptions={{ headerShown: false }}
        >
            {!userData?.token ? (
                <RootStack.Screen
                    name="AuthStack"
                    component={LoginScreenStack}
                />
            ) : (
                <RootStack.Screen
                    name="MainTabStack"
                    component={MainStack}
                />
            )}
        </RootStack.Navigator>
    );
}
