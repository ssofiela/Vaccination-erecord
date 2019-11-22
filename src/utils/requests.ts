import { VaccineFormState } from "../interfaces/vaccine";
import { isNonEmpty } from "./field-validation";

export function createNewVaccineEntry(values: VaccineFormState): Promise<number> {
    return fetch("https://vaccine-backend.herokuapp.com/api/dose", {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            vaccine_id: values.vaccineType.id,
            date_taken: values.dateTaken,
            booster_due_date: (values.boosterDate && isNonEmpty(values.boosterDate))? values.boosterDate : null,
            booster_email_reminder: values.reminder,
            booster_reminder_address: values.reminderEmail,
            comment: values.comment
        })
    }).then(response => response.status)
}

export async function updateVaccineEntry(values: VaccineFormState): Promise<number> {
    return fetch(`https://vaccine-backend.herokuapp.com/api/dose/${values.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            vaccine_id: values.vaccineType.id,
            date_taken: values.dateTaken,
            booster_due_date: values.boosterDate ? values.boosterDate : null,
            booster_email_reminder: values.reminder,
            booster_reminder_address: values.reminderEmail,
            comment: values.comment
        })
    }).then(response => response.status)
}