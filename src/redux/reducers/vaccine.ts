import { Action } from "redux-actions";

import { ACTION_TYPES } from "../../utils/constants";
import { SetVaccinePayload } from "../actions/vaccine";

export type VaccineState = {
    name: string;
};

export type VaccineStatePayload = SetVaccinePayload;

const initialVaccineState = {
    name: ""
};

export const vaccineReducer = (
    state = initialVaccineState,
    action: Action<VaccineStatePayload>
): VaccineState => {
    switch (action.type) {
        case ACTION_TYPES.STORE_VACCINE:
            return {
                ...state,
                name: action.payload
            };
        default:
            return state;
    }
};
