import { ACTION_TYPES } from "../../utils/constants";
import { Session } from "../../interfaces/session";

interface ReceiveCurrentUserAction {
    type: typeof ACTION_TYPES.RECEIVE_CURRENT_USER;
    payload: Session;
}

interface LogoutCurrentUserAction {
    type: typeof ACTION_TYPES.LOGOUT_CURRENT_USER;
}

export type SessionActionTypes = ReceiveCurrentUserAction | LogoutCurrentUserAction;

export function receiveCurrentUser(session: Session): SessionActionTypes {
    return {
        type: ACTION_TYPES.RECEIVE_CURRENT_USER,
        payload: session
    };
}

export function logoutCurrentUser(): SessionActionTypes {
    return { type: ACTION_TYPES.LOGOUT_CURRENT_USER };
}
