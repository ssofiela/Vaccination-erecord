import { combineReducers } from "redux";

import { userReducer } from "./user";
import { vaccineReducer } from "./vaccine";

export interface RootState {
    userId?: number;
}

export const rootReducer = combineReducers({
    user: userReducer,
    vaccine: vaccineReducer
});
