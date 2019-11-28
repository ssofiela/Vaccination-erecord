/* eslint-disable @typescript-eslint/camelcase */
import moment from "moment";

import { Vaccine, VaccineFormState, VaccinePayload, VaccineType } from "../interfaces/vaccine";
import { AccountSettingsFormState, AccountSettingsPayload, User } from "../interfaces/user";

import { convertDotFormatToISO, convertISOFormatToDotFormat } from "./date-utils";

export function mapToVaccineFormState(vaccinePayload: Vaccine): VaccineFormState {
    return {
        id: String(vaccinePayload.id),
        vaccineType: {
            id: String(vaccinePayload.vaccine_id),
            name: vaccinePayload.vaccine_name,
            abbreviation: vaccinePayload.vaccine_abbreviation
        },
        dateTaken: convertDotFormatToISO(vaccinePayload.date_taken),
        boosterDate: vaccinePayload.booster_due_date
            ? convertDotFormatToISO(vaccinePayload.booster_due_date)
            : undefined,
        reminder: vaccinePayload.booster_email_reminder,
        reminderEmail: vaccinePayload.booster_reminder_address
            ? vaccinePayload.booster_reminder_address
            : "",
        comment: vaccinePayload.comment
    };
}

export function mapVaccineFormStateToPayload(vaccineFormState: VaccineFormState): VaccinePayload {
    return {
        vaccine_id: vaccineFormState.vaccineType.id,
        date_taken: convertISOFormatToDotFormat(vaccineFormState.dateTaken),
        booster_due_date: vaccineFormState.boosterDate
            ? convertISOFormatToDotFormat(vaccineFormState.boosterDate)
            : undefined,
        booster_email_reminder: vaccineFormState.reminder,
        booster_reminder_address: vaccineFormState.reminder
            ? vaccineFormState.reminderEmail
            : undefined,
        comment: vaccineFormState.comment
    };
}

export function createVaccineEntryInitialValues(defaultReminderEmail: string): VaccineFormState {
    return {
        id: "",
        vaccineType: { id: "", name: "", abbreviation: "" },
        dateTaken: convertDotFormatToISO(new Date(moment().format()).toLocaleDateString()),
        boosterDate: undefined,
        reminder: false,
        reminderEmail: defaultReminderEmail ? defaultReminderEmail : "",
        comment: ""
    };
}

export function mapToAccountSettingsFormState(
    accountSettings: AccountSettingsPayload
): AccountSettingsFormState {
    return {
        reminderEmail: accountSettings.default_reminder_email || "",
        reminderDaysBeforeDue: accountSettings.reminder_days_before_due
            ? String(accountSettings.reminder_days_before_due)
            : "",
        birthYear: accountSettings.year_born ? String(accountSettings.year_born) : ""
    };
}

export function createAccountSettingsInitialValues(): AccountSettingsFormState {
    return {
        reminderEmail: "",
        birthYear: "",
        reminderDaysBeforeDue: "30"
    };
}

export function mapToVaccinePayload(vaccinePayload: Vaccine): Vaccine {
    return Object.assign({}, vaccinePayload);
}

export function mapToVaccineType(vaccineTypePayload: VaccineType): VaccineType {
    return Object.assign({}, vaccineTypePayload, { id: String(vaccineTypePayload.id) });
}

export function mapToUser(userPayload: User): User {
    return Object.assign({}, userPayload);
}
