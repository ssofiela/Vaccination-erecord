//eslint-disable @typescript-eslint/camelcase

export interface Vaccine {
    id: number;
    vaccine_id: number;
    vaccine_name: string;
    vaccine_abbreviation: string;
    date_taken: string;
    booster_due_date?: string;
    booster_email_reminder: boolean;
    booster_reminder_address?: string;
    comment?: string;
}

export interface VaccineFormState {
    id: string;
    vaccineType: VaccineType;
    dateTaken: string;
    boosterDate?: string;
    reminder: boolean;
    reminderEmail?: string;
    comment?: string;
}

export interface VaccinePayload {
    vaccine_id: string;
    date_taken: string;
    booster_due_date?: string;
    booster_email_reminder: boolean;
    booster_reminder_address?: string;
    comment?: string;
}

export interface VaccineType {
    id: string;
    name: string;
    abbreviation: string;
}
