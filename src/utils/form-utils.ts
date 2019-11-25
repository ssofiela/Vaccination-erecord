import { isEmpty } from "lodash";

export function isNonEmpty(str?: string): boolean {
    return str !== undefined && str !== null && str.trim().length > 0;
}

export function hasFieldErrors(errors: object): boolean {
    return !isEmpty(errors);
}
