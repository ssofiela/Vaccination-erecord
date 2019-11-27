import { createStore, Store, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { rootReducer, RootState } from "./reducers";

export function configureStore(initialState: RootState): Store<RootState> {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
