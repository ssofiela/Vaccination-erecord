import { handleActions, Action } from "redux-actions";

import { User, UserPayload } from "../../interfaces/user";
import { Type } from "../actions/user";

export type UserState = {
    userId?: number
};

const initialState: UserState = {
};

export const userReducer = handleActions<UserState, User>(
    {[Type.STORE_USER_ID]: (
        state: UserState,
        action: Action<UserPayload>
        ) => {
            return {
                userId: action.payload.userId
            };
        }
    },
    initialState
);