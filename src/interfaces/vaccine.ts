export interface Vaccine {
    id: number;
    vaccine_id: number;
    vaccine_name: string;
    vaccine_abbreviation: string;
    date_taken: string;
    booster_due_date?: string;
    booster_email_reminder?: boolean;
    booster_reminder_address?: string;
    comment?: string;
}
