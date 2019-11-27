import { combineReducers } from "redux";

import { Session } from "../../interfaces/session";
import { User } from "../../interfaces/user";

import { userReducer } from "./user";
import { sessionReducer } from "./session";

export interface RootState {
    user?: User;
    session: Session;
}

export const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer
});
