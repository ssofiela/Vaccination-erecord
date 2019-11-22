//eslint-disable-next-line import/no-unassigned-import
import "date-fns";

interface BirthdayOptions {
    value: string;
    label: string;
}

function createBirthdayOptions(options: string[]): BirthdayOptions[] {
    return options.map((option) => ({ value: option, label: `${option} days before` }));
}

const reminderOptions = Array.from(Array(45).keys()).map(elem => String(elem + 1));

export const mappedReminderOptions = createBirthdayOptions(reminderOptions);
