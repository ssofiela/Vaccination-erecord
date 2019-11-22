/**
 * Convert DD.MM.YYYY to YYYY-MM-DD
 * @param date
 */
export function convertDotFormatToISO(date: string): string {
    const splitDate = date.split(".");
    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
}

export function convertISOFormatToDotFormat(date:string): string {
    const splitDate = date.split("/");
    return `${splitDate[0]}.${splitDate[1]}.${splitDate[2]}`
}