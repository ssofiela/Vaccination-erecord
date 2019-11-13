import { Action } from "redux-actions";

import { ACTION_TYPES } from "../../utils/constants";

export type SetVaccinePayload = string;

export const storeVaccine = (payload: SetVaccinePayload): Action<SetVaccinePayload> => {
    return {
        type: ACTION_TYPES.STORE_VACCINE,
        payload: payload
    };
};
