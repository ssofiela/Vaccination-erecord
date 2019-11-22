import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "../common/form-input/form-styles";
import { TextInput } from "../common/form-input";


interface OwnProps {
    radioValue: boolean
    inputValue?: string
    tooltip?: string
    errorMessage?: string
    required?: boolean
    name: string
    id: string
}

type Props = OwnProps & RadioGroupProps;

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateEmailRemainder: (emailReminder: string) => void;
    updateEmail: (email: string) => void;
    error: boolean;
    emailReminder: string;
}

const reminderStyles = makeStyles((theme: Theme) =>
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

const ReminderCheck: React.FC<Props> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    //const reminderClasses = reminderStyles();
    const [value, setValue] = React.useState(props.radioValue);
    const [email, setEmail] = React.useState("No");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue((event.target as HTMLInputElement).value === "true");
    };
    /*const addInput = (): void => {
        setEmail("Yes");
        props.updateEmailRemainder("Yes");
    };
    const removeInput = (): void => {
        setEmail("No");
        props.updateEmailRemainder("No");
    };

    const changeEmail = (email: string): void => {
        props.updateEmail(email);
    };*/

    return (
        <Box style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <InputLabel required={props.required}>
                            {props.name}
                        </InputLabel>
                        {props.tooltip && (
                            <Tooltip title={props.tooltip}>
                                <HelpOutlineOutlinedIcon
                                    style={{ fontSize: "1.2rem", color: "rgba(0, 0, 0, 0.54)" }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                </Grid>
                <FormControl hiddenLabel fullWidth component="fieldset">
                    <RadioGroup
                        value={value}
                        onChange={handleChange}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                        >
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    value={true}
                                    control={ <Radio color="primary"/> }
                                    label="Yes"
                                />
                            </Grid>
                            {value &&
                            <Grid item xs={12} sm={6}>
                                <TextInput
                                    value={props.inputValue}
                                    name="Email for reminder"
                                />
                            </Grid>
                            }
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    value={false}
                                    control={< Radio color="primary"/> }
                                    label="No"
                                />
                            </Grid>
                        </Box>

                    </RadioGroup>

                    {/*<div className={reminderClasses.sameLine}>
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
                        className={reminderClasses.textField}
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
            </RadioGroup>*/}
                </FormControl>
            </Grid>
        </Box>
    );
};

export default ReminderCheck;
