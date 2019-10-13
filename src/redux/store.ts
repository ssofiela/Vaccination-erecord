import { createStore, Store } from "redux";

import { rootReducer, RootState } from "./reducers/index";

export function configureStore(initialState?: RootState): Store<RootState> {
    return createStore(rootReducer, initialState);
}
