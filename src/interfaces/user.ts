export const STORE_USER_ID = "STORE_USER_ID";

export type UserState = {
    userId?: number;
};

export interface AccountSettingsFormState {
    reminderEmail: string;
    birthYear: string;
    reminderDaysBeforeDue: string;
}

export interface AccountSettingsPayload {
    default_reminder_email: string;
    reminder_days_before_due: number;
    year_born: number;
}

interface UserIdAction {
    type: typeof STORE_USER_ID;
    payload: number;
}

export type userActionTypes = UserIdAction;
