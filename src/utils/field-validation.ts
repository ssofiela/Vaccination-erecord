import * as yup from "yup";

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

export function addNewVaccineValidationSchema(): yup.ObjectSchema<{}> {
    return yup.object().shape({
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
            is: (reminder) => reminder,
            then: yup.string()
                .trim()
                .required("Turning on email reminders requires an email address.")
                .email("Email is not a valid email address.")

        }),
        comment: yup.string()
    });
}

export function isNonEmpty(str?: string): boolean {
    console.log(str);
    return str !== undefined && str !== null && (str.trim().length > 0);
}
