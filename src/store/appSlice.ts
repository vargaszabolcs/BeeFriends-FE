import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Network from "../constants/Network";
import { IUser } from "../types";
import { AppDispatch } from "./store";

export interface IAppState {
    userData: IUser | undefined;
}

const initialState: IAppState = {
    userData: undefined,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<IUser>) => {
            state.userData = action.payload;
        },
        logOut: state => {
            state.userData = undefined;
        },
    },
});

export const { logIn, logOut } = appSlice.actions;

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

export default appSlice.reducer;
