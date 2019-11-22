import { Vaccine, VaccineFormState, VaccineType } from "../interfaces/vaccine";
import { AccountSettingsFormState } from "../interfaces/user";

export function mapToVaccineFormState(vaccinePayload: Vaccine): VaccineFormState {
    return {
        id: String(vaccinePayload.id),
        vaccineType: {
            id: String(vaccinePayload.vaccine_id),
            name: vaccinePayload.vaccine_name,
            abbreviation: vaccinePayload.vaccine_abbreviation
        },
        dateTaken: vaccinePayload.date_taken,
        boosterDate: vaccinePayload.booster_due_date,
        reminder: vaccinePayload.booster_email_reminder,
        reminderEmail: vaccinePayload.booster_reminder_address,
        comment: vaccinePayload.comment
    }
}

export function createVaccineEntryInitialValues(): VaccineFormState {
    return {
        id: "",
        vaccineType: { id: "", name: "", abbreviation: ""},
        dateTaken: "",
        boosterDate: "",
        reminder: false,
        reminderEmail: "",
        comment: ""
    }
}

export function mapToAccountSettingsFormState(accountSettings: AccountSettingsFormState): AccountSettingsFormState {
    return {
        reminderEmail: accountSettings.reminderEmail || "",
        reminderDaysBeforeDue: accountSettings.reminderDaysBeforeDue ? String(accountSettings.reminderDaysBeforeDue) : "",
        birthYear: accountSettings.birthYear? String(accountSettings.birthYear) : ""
    }
}

export function createAccountSettingsInitialValues(): AccountSettingsFormState {
    return {
        reminderEmail: "",
        birthYear: "",
        reminderDaysBeforeDue: "30"
    }
}

export function mapToVaccinePayload(vaccinePayload: Vaccine): Vaccine {
    return Object.assign({}, vaccinePayload)
}

export function mapToVaccineType(vaccineTypePayload: VaccineType): VaccineType {
    return Object.assign({}, vaccineTypePayload, { id: String(vaccineTypePayload.id)})
}