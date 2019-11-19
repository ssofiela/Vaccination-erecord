import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";


interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateEmailRemainder: (emailReminder: string) => void;
    updateEmail: (email: string) => void;
    error: boolean;
    emailReminder: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginRight: theme.spacing(1),
            maxWidth: 300,
            display:"flex",
        },
        sameLine: {
            flexDirection: "row",
            display: "flex"
        },
        margin: {
            margin: theme.spacing(3)
        },
    })
);

const ReminderCheck: React.FC<MainProps> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState("female");
    const [email, setEmail] = React.useState("No");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue((event.target as HTMLInputElement).value);
    };
    const addInput = (): void => {
        setEmail("Yes");
        props.updateEmailRemainder("Yes");
    };
    const removeInput = (): void => {
        setEmail("No");
        props.updateEmailRemainder("No");
    };

    const changeEmail = (email: string): void => {
        props.updateEmail(email);
    };

    return (
        <FormControl component="fieldset">
            <div className={classes.sameLine}>
                <FormLabel component="legend">Turn on email reminder</FormLabel>
                <Tooltip
                    title="If you want to get email reminder for this vaccine select yes, otherwise select no.">
                    <IconButton aria-label="delete" size="small">
                        <HelpOutlineOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </div>
            <RadioGroup
                aria-label="position"
                name="position"
                value={props.emailReminder === "Yes" ? "Yes" : email}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="Yes"
                    control={<Radio color="primary" />}
                    label="Yes"
                    onChange={addInput}
                    labelPlacement="end"
                />
                {email == "Yes" ? (
                    <TextField
                        error={props.error === "email"}
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        className={classes.textField}
                        onChange={event =>
                            changeEmail(event.target.value)
                        }
                    />
                ) : null}
                <FormControlLabel
                    value="No"
                    control={<Radio color="primary" />}
                    label="No"
                    onChange={removeInput}
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default ReminderCheck;
