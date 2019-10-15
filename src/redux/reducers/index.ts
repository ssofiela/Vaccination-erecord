import { combineReducers } from "redux";
import { userReducer } from "./user";
import { vaccineReducer } from "./vaccine";

export interface RootState {}

export const rootReducer = combineReducers<RootState>({
    userReducer,
    vaccineReducer
});
