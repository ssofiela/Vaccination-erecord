//eslint-disable-next-line import/no-unassigned-import
import "date-fns";

interface BirthdayOptions {
    value: number;
    label: string;
}

function createBirthdayOptions(options: string[]): BirthdayOptions[] {
    return options.map((option) => ({ value: options.indexOf(option) +1, label: option }));
}

const reminderOptions = [
    "1 day before", "2 days before", "3 days before",
    "4 days before", "5 days before", "6 days before", "7 days before", "8 days before", "9 days before", "10 days before", "11 days before", "12 days before",
    "13 days before", "14 days before", "15 days before", "16 days before", "17 days before", "18 days before", "19 days before", "20 days before", "21 days before",
    "22 days before", "23 days before", "24 days before", "25 days before", "26 days before", "27 days before", "28 days before", "29 days before", "30 days before",
];

export const mappedReminderOptions = createBirthdayOptions(reminderOptions);
