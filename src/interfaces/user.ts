export const STORE_USER_ID = 'STORE_USER_ID'

export type UserState = {
    userId?: number;
};

export interface AccountSettingsFormState {
    reminderEmail: string,
    birthYear: string,
    reminderDaysBeforeDue: string
}

interface UserIdAction {
    type: typeof STORE_USER_ID
    payload: number
}

export type userActionTypes = UserIdAction;