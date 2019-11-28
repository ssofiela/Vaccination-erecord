import { VaccineFormState } from "../interfaces/vaccine";
import { UserAuth } from "../interfaces/user";
import { RootState } from "../redux/reducers";

import { mapToUser, mapVaccineFormStateToPayload } from "./data-mapper";

export const register = (user: UserAuth): Promise<Response> => {
    return fetch("https://vaccine-backend.herokuapp.com/api/user/create", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    }).then((response) => {
        return response;
    });
};

export const login = (user: UserAuth): Promise<Response> => {
    return fetch("https://vaccine-backend.herokuapp.com/api/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            username: user.email,
            password: user.password
        })
    }).then((response) => {
        return response;
    });
};

export const logout = (): Promise<Response> => {
    return fetch("https://vaccine-backend.herokuapp.com/api/logout", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then((response) => {
        return response;
    });
};

export const checkLoggedIn = (): Promise<RootState> => {
    const initialState = {
        session: {}
    };
    return fetch("https://vaccine-backend.herokuapp.com/api/user", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then((response) => {
        if (response.ok) {
            return response.json().then((data) => {
                const user = mapToUser(data);
                return {
                    ...initialState,
                    session: {
                        id: user.id
                    }
                };
            });
        } else {
            return initialState;
        }
    });
};

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
