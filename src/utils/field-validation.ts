import * as yup from "yup";

function reminderIsSet(reminder: boolean): boolean {
    return reminder;
}

export const registrationValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required.")
        .email("Email is not valid."),
    password: yup
        .string()
        .min(8, "Password has to be at least 8 characters long.")
        .required("Password is required.")
});

export function getNewVaccineValidationSchema(): yup.ObjectSchema<{}> {
    return yup.object().shape({
        vaccine: yup.object().shape({
            id: yup.string(),
            vaccineType: yup.object().shape({
                id: yup.string().required("Vaccine type is required."),
                name: yup.string().required("Vaccine name is required."),
                abbreviation: yup.string().required("Vaccine abbreviation is required.")
            }),
            dateTaken: yup.date().required("Date when vaccine was taken is required."),
            boosterDate: yup.date(),
            reminder: yup.boolean(),
            reminderEmail: yup.string().when("reminder", {
                is: reminderIsSet,
                then: yup
                    .string()
                    .trim()
                    .required("Turning on email reminders requires an email address.")
                    .email("Reminder email is not a valid email address.")
            }),
            comment: yup.string()
        })
    });
}

export function getSettingsValidationSchema(): yup.ObjectSchema<{}> {
    return yup.object().shape({
        settings: yup.object().shape({
            reminderEmail: yup
                .string()
                .trim()
                .email("Reminder email is not a valid email address."),
            birthYear: yup.string(),
            reminderDaysBeforeDue: yup.string()
        })
    });
}
