import { handleActions, Action } from "redux-actions";

import { User } from "../../interfaces/user";
import { Type } from "../actions/user";

export type UserState = {
    userId?: number;
};

const initialState: UserState = {};

export const userReducer = handleActions<UserState, User>(
    {
        [Type.STORE_USER_ID]: (state: UserState, action: Action<User>) => {
            return {
                userId: action.payload.userId
            };
        }
    },
    initialState
);
