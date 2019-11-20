import { Vaccine } from "../interfaces/vaccine";

export function mapToVaccineFormState(vaccinePayload: Vaccine): Vaccine {
    return Object.assign({}, vaccinePayload);
}
