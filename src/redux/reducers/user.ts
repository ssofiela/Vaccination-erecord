import { userActionTypes, UserState, STORE_USER_ID } from "../../interfaces/user";

const initialState: UserState = {
    userId: 0
};

export const userReducer = (state = initialState, action: userActionTypes): UserState => {
    switch(action.type) {
        case STORE_USER_ID: {
            return Object.assign({}, state, {userId: action.payload});
        }
        default:
            return state;
    }
};

