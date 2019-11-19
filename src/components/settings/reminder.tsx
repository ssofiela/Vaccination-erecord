import React from "react";
import "date-fns";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateBirthday: any;
    editStatus: boolean;
    type: string;
    mobile: boolean;
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginRight: theme.spacing(1),
            maxWidth: 300,
            display:"flex",
            flexDirection:"column"
        },
        formControl: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
            minWidth: 300,
            display:"flex",
            flexDirection:"column"
        },
        formControlMobile: {
            minWidth: 150,
            display:"flex",
            flexDirection:"column",
            marginRight: theme.spacing(1),
        },
        margin: {
            margin: theme.spacing(3)
        },
    })
);

const Reminder: React.FC<MainProps> = props => {
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
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                :
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
                                {mappedBirthdayOptions.map(option => (
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
            }
        </div>
    );
};

export default Reminder;
