import { Action } from "redux-actions";
import { userActionTypes, STORE_USER_ID, UserState } from "../../interfaces/user";



export const storeUserId = (payload: userActionTypes): Action<userActionTypes> => {
    return {
        type: STORE_USER_ID,
        payload: payload
    }
}

