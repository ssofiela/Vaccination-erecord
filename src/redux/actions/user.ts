import { User } from "../../interfaces/user";
import { ACTION_TYPES } from "../../utils/constants";

interface StoreUserAction {
    type: typeof ACTION_TYPES.STORE_USER;
    payload: User;
}

interface ClearStoredUserAction {
    type: typeof ACTION_TYPES.CLEAR_STORED_USER;
}

export type UserActionTypes = StoreUserAction | ClearStoredUserAction;

export function storeUser(user: User): UserActionTypes {
    return {
        type: ACTION_TYPES.STORE_USER,
        payload: user
    };
}

export function clearStoredUser(): UserActionTypes {
    return { type: ACTION_TYPES.CLEAR_STORED_USER };
}
