/**
 * Convert DD.MM.YYYY to MM-DD-YYYY
 * @param date
 */
export function convertDotFormatToISO(date: string): string {
    if (date.includes(".")) {
        const splitDate = date.split(".");
        return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
    } else {
        return date;
    }
}

export function convertISOFormatToDotFormat(date: string): string {
    const splitDate = date.split("/");
    return `${splitDate[1]}.${splitDate[0]}.${splitDate[2]}`;
}
