import { Action, IStoreState } from "./../types";
import { actionTypes } from "./actionTypes";

const defaultState: IStoreState = {
    userData: null
};

export default function reducer(state = defaultState, action: Action) {
    if (state === undefined) {
        return defaultState;
    }

    switch (action.type) {
    case actionTypes.LOGGED_IN:
        return {...state, userData: action.payload};
    case actionTypes.LOGGED_OUT:
        return { ...state, userData: null };
    default:
        return state;
    }
}