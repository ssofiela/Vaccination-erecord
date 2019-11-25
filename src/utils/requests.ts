import { VaccineFormState } from "../interfaces/vaccine";

import { mapVaccineFormStateToPayload } from "./data-mapper";

export function createNewVaccineEntry(values: VaccineFormState): Promise<number> {
    const payload = mapVaccineFormStateToPayload(values);
    return fetch("https://vaccine-backend.herokuapp.com/api/dose", {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        return response.status;
    });
}

export async function updateVaccineEntry(values: VaccineFormState): Promise<number> {
    const payload = mapVaccineFormStateToPayload(values);
    return fetch(`https://vaccine-backend.herokuapp.com/api/dose/${values.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        return response.status;
    });
}
