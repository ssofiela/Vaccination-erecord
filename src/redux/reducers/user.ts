import { ACTION_TYPES } from "../../utils/constants";
import { User } from "../../interfaces/user";
import { UserActionTypes } from "../actions/user";

interface UserState {
    user?: User;
}

const _initialState = {};

export const userReducer = (state = _initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case ACTION_TYPES.STORE_USER:
            return {


                // TODO leave above ignore comment if this compiles and works with no issues
                ...state,
                //eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                //@ts-ignore
                ...action.payload,

            };
        case ACTION_TYPES.CLEAR_STORED_USER:
            return _initialState;
        default:
            return state;
    }
};
