export const STORE_USER_ID = 'STORE_USER_ID'

export type UserState = {
    userId?: number;
};

interface userIdAction {
    type: typeof STORE_USER_ID
    payload: number
}

export type userActionTypes = userIdAction;