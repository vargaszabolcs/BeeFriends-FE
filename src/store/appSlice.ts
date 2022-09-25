import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";

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

export default appSlice.reducer;
