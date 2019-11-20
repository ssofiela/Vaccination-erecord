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

export const addNewVaccineValidationSchema = yup.object().shape({
    vaccine: yup.string().required("Vaccine is required."),
    date: yup.date().required("The date when the vaccine was taken is required."),
    boosterDueDate: yup.date(),
    reminder: yup.string().required("Required.")
});
