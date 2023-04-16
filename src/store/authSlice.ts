import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Network from "../constants/Network";
import { removeLocalData, saveLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { IUser } from "../types";
import { AppDispatch } from "./store";

export interface IAuthState {
    userData: IUser | undefined;
}

const initialState: IAuthState = {
    userData: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<IUser>) => {
            saveLocalData(StorageKeys.USER_DATA, JSON.stringify(action.payload), true);
            state.userData = action.payload;
        },
        logOut: state => {
            removeLocalData(StorageKeys.USER_DATA, true);
            state.userData = undefined;
        },
    },
});

export const { logIn, logOut } = authSlice.actions;

export const changePasswordAsync =
    (userId: string, oldPassword: string, newPassword: string) => async () => {
        try {
            const response = await axios.post(
                `${Network.API_URL}/auth/change-password`,
                { userId, oldPassword, newPassword },
                { timeout: 5000 },
            );

            if (response.data.error) {
                return { error: response.data.error };
            } else {
                return { message: "Password changed successfully!" };
            }
        } catch (err) {
            console.error(err);
            return {
                error: "Something went wrong. Please try again later and check your internet connection!",
            };
        }
    };

export const deleteAccountAsync =
    (userId: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete(`${Network.API_URL}/auth/delete-account`, {
                data: { userId, password },
            });

            if (response.data.error) {
                return { error: response.data.error };
            } else {
                dispatch(logOut());
                return { message: "Account deleted successfully!" };
            }
        } catch (err) {
            console.error(err);
            return {
                error: "Something went wrong. Please try again later and check your internet connection!",
            };
        }
    };

export default authSlice.reducer;
