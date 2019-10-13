import { createStore, applyMiddleware, compose } from "redux";

import { rootReducer, RootState} from "./reducers/index";

export function configureStore(initialState?: RootState) {
    return createStore(rootReducer, initialState!)
}