import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { StorageKeys } from "./storageKeys";

export async function saveLocalData(key: StorageKeys, value: string, secure = false) {
    try {
        if (secure) {
            await SecureStore.setItemAsync(key, value);
        } else {
            await AsyncStorage.setItem(key, value);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getLocalData(key: StorageKeys, secure = false) {
    try {
        if (secure) {
            return await SecureStore.getItemAsync(key);
        } else {
            return await AsyncStorage.getItem(key);
        }
    } catch (error) {
        console.error(error);
        Promise.reject(error);
    }
}

export async function removeLocalData(key: StorageKeys, secure = false) {
    try {
        if (secure) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await AsyncStorage.removeItem(key);
        }
    } catch (error) {
        console.error(error);
    }
}
