import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import TextInput from "../common/form-input/text-input";

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateBirthday: (birthday: number) => void;
    editStatus: boolean;
    type: string;
    mobile: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginRight: theme.spacing(1),
            maxWidth: 300,
        },
        formControl: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
            minWidth: 300,
            display: "flex",
            flexDirection: "column"
        },
        formControlMobile: {
            minWidth: 150,
            display: "flex",
            flexDirection: "column",
            marginRight: theme.spacing(1),
        },
        margin: {
            margin: theme.spacing(3)
        },
    })
);

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

const Reminder: React.FC<MainProps> = (props) => {
    const classes = useStyles();

    const [reminder, setReminder] = React.useState<{
        reminder: string;
    }>({
        reminder: ""
    });

    const handleChange = (time: keyof typeof reminder) => (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        setReminder({
            ...reminder,
            [time]: event.target.value
        });
        props.updateBirthday(parseInt(event.target.value));
    };

    return (
        <div>
            {!props.editStatus ? (
                <div>
                    <TextInput
                        variant="outlined"
                        name="reminder"
                        label="Reminder time"
                        type="string"
                        id="reminder"
                        value={reminder.reminder === "" ? "Not selected" : reminder.reminder}
                        autoComplete="current-password"
                        className={classes.textField}
                        disabled
                    />
                </div>
            ) : (
                <Box
                    display="flex"
                    flexDirection="row"
                    p={5}
                    padding="0px 0px 0px 0px"
                >
                    <FormControl variant="outlined" className={props.mobile ? classes.formControlMobile : classes.formControl}>
                        <InputLabel id="demo-simple-select-label">{"Reminder time"}</InputLabel>
                            <Select
                                id="demo-simple-select"
                                value={reminder.reminder}
                                onChange={handleChange("reminder")}
                                native
                                name="reminder"
                                inputProps={{
                                    name: "reminder",
                                    id: "outlined-age-native-simple"
                                }}
                            >
                                {mappedBirthdayOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                    </FormControl>
                    <Tooltip
                        title="Reminder time is when you deserve reminder for your vaccine.">
                        <IconButton aria-label="delete" className={classes.margin} size="small">
                            <HelpOutlineOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </div>
    );
};

export default Reminder;
