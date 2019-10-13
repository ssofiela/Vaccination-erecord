import { combineReducers} from "redux";
import { userReducer } from "./user";

export interface RootState {

}

export const rootReducer = combineReducers<RootState>({
    userReducer
});