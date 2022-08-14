import { IUser } from "./../types";
import { actionTypes } from "./actionTypes";

export const loggedIn = (user: IUser) => ({
    type: actionTypes.LOGGED_IN,
    payload: user
});

export const loggedOut = () => ({
    type: actionTypes.LOGGED_OUT,
    payload: null
});