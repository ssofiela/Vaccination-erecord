import { Session } from "../../interfaces/session";
import { ACTION_TYPES } from "../../utils/constants";
import { SessionActionTypes } from "../actions/session";

interface SessionState {
    session?: Session;
}

const _nullSession: SessionState = {};

export function sessionReducer(state = _nullSession, action: SessionActionTypes): SessionState {
    Object.freeze(state);
    switch (action.type) {
        case ACTION_TYPES.RECEIVE_CURRENT_USER:
            return {
                ...state,
                //eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                //@ts-ignore
                // TODO leave above ignore comment if this compiles and works with no issues
                ...action.payload
            };
        case ACTION_TYPES.LOGOUT_CURRENT_USER:
            return _nullSession;
        default:
            return state;
    }
}
