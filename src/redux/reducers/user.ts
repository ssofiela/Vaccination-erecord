import { userActionTypes, UserState } from "../../interfaces/user";
import { STORE_USER_ID } from "../../interfaces/user";


const initialState: UserState = {
    userId: 0
};

export const userReducer = (state = initialState, action: userActionTypes): UserState => {
    switch(action.type) {
        case STORE_USER_ID:
            const res = Object.assign({}, state, {userId: action.payload});
            return res;
        default:
            return state;
    }
};

