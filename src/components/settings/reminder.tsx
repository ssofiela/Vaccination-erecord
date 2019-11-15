import React from "react";
import "date-fns";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateBirthday: any;
    editStatus: boolean;
    type: string;
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: 200,
            display:"flex",
            flexDirection:"column"
        },
        formControl: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: 200,
            display:"flex",
            flexDirection:"column"
        }
    })
);

const Reminder: React.FC<MainProps> = props => {
    const classes = useStyles();

    const [reminder, setReminder] = React.useState<{
        reminder: string;
    }>({
        reminder: "Booster date"
    });

    const handleChange = (time: keyof typeof reminder) => (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        setReminder({
            ...reminder,
            [time]: event.target.value
        });
        props.updateBirthday(event.target.value);
    };

    interface BirthdayOptions {
        value: string;
        label: string;
    }

    function createBirthdayOptions(options: string[]): BirthdayOptions[] {
        return options.map(option => ({ value: option, label: option }));
    }

    const reminderOptions = [
        "1 week before", "2 weeks before", "3 weeks before", "1 months before", "2 months before", "3 months before", "4 months before", "5 months before", "6 months before", "1 year before", "2 years before"
    ];

    const mappedBirthdayOptions = createBirthdayOptions(reminderOptions);


    return (
        <div>
            {!props.editStatus ?
                <div>
                    <InputLabel id="demo-simple-select-label">{props.type}</InputLabel>
                    <TextField
                        value={reminder.reminder}
                        id="standard-basic"
                        className={classes.textField}
                        disabled
                    />
                </div>
                :
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">{props.type}</InputLabel>
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
                        {mappedBirthdayOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            }
        </div>
    );
};

export default Reminder;
