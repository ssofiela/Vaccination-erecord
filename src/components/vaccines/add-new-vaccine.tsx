import React from "react";
import Button from "@material-ui/core/Button";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import {
    createStyles,
    makeStyles,
    styled,
    Theme,
    useTheme,
    withStyles
} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import { Formik } from "formik";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Colorize from "@material-ui/icons/Colorize";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { RouteComponentProps, withRouter } from "react-router";
import VaccineName from "./vaccine-name";

import ReminderCheck from "./reminder-check";
import { TextField } from "@material-ui/core";

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            borderLeft: `7px solid ${theme.palette.primary.main}`
        },
        container: {
            margin: theme.spacing(2, 4),
            overFlowX: "auto",
            minWidth: 800
        },
        link: {
            display: "flex"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        dropdown: {
            width: "100%",
            height: "45px"
        },
        menu: {
            width: 200
        },
        inputField: {
            display: "flex",
            flexWrap: "wrap"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    })
);

const StyledButton = withStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 0
        },
        outlined: {
            backgroundColor: theme.palette.background.default,
            borderWidth: "2px",
            "&:hover": {
                borderWidth: "2px"
            }
        },
        contained: {
            marginRight: theme.spacing(2.5),
            color: "#fff"
        }
    })
)(Button);

/**
 * Adding a new vaccine entry
 * @param props
 * @constructor
 */
const NewVaccine: React.FC<RouteComponentProps> = props => {
    const classes = useStyles();
    const theme = useTheme();

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date("2019-10-16")
    );
    const handleDateChange = (date: Date | null | any): void => {
        setSelectedDate(date);
    };

    const [name, setName] = React.useState<string>("");
    const [emailReminder, setReminder] = React.useState<string>("No");
    const [email, setEmail] = React.useState<string>("");

    const [comment, setComment] = React.useState<string>("");

    const handleComment = (event: string): void => {
        setComment(event);
    };

    const [errors, setErrors] = React.useState<string[]>([]);

    const handleErrors = (error: string): void => {
        setErrors(error);
        console.log("error", error);
    };

    return (
        <Paper square className={classes.container}>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        className={classes.header}
                        display="flex"
                        flexDirection="row"
                        bgcolor={theme.palette.secondary.main}
                        p={1.5}
                    >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                variant="body1"
                                color="inherit"
                                href="/"
                                className={classes.link}
                            >
                                <StyledColorize />
                                My vaccines
                            </Link>
                            <Typography
                                color="inherit"
                                variant="body1"
                                className={classes.link}
                            >
                                New vaccine entry
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{ vaccine: "", date: "" }}
                        onSubmit={() => {
                            alert("Form is validated! Submitting the form...");
                        }}
                    >
                        {form => (
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        p={5}
                                    >
                                        <Grid item xs={6}>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                p={5}
                                            >
                                                {errors.includes("name") ? (
                                                    <VaccineName
                                                        sidebarOpen
                                                        updateName={(
                                                            name: string
                                                        ): void =>
                                                            setName(name)
                                                        }
                                                        error={"name"}
                                                    />
                                                ) : (
                                                    <VaccineName
                                                        sidebarOpen
                                                        updateName={(
                                                            name: string
                                                        ): void =>
                                                            setName(name)
                                                        }
                                                        error={""}
                                                    />
                                                )}
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                p={5}
                                            >
                                                <ReminderCheck
                                                    sidebarOpen
                                                    updateEmailRemainder={(
                                                        emailReminder: string
                                                    ): void =>
                                                        setReminder(
                                                            emailReminder
                                                        )
                                                    }
                                                    updateEmail={(
                                                        email: string
                                                    ): void => setEmail(email)}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                p={5}
                                            >
                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}
                                                >
                                                    <Grid container>
                                                        <KeyboardDatePicker
                                                            name="date"
                                                            disableToolbar
                                                            variant="inline"
                                                            format="dd/MM/yyyy"
                                                            margin="dense"
                                                            id="date-picker"
                                                            label="Date"
                                                            value={selectedDate}
                                                            onChange={event =>
                                                                handleDateChange(
                                                                    event
                                                                )
                                                            }
                                                            KeyboardButtonProps={{
                                                                "aria-label":
                                                                    "change date"
                                                            }}
                                                        />
                                                    </Grid>
                                                </MuiPickersUtilsProvider>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                p={5}
                                            >
                                                <form
                                                    className={
                                                        classes.inputField
                                                    }
                                                >
                                                    <TextField
                                                        multiline
                                                        onChange={event =>
                                                            handleComment(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        className={
                                                            classes.textField
                                                        }
                                                        margin="normal"
                                                        label="Comment"
                                                    />
                                                </form>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        bgcolor="#f9f9f9"
                                        p={2}
                                    >
                                        <StyledButton
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                if (name === "") {
                                                    handleErrors("name");
                                                } else if (
                                                    emailReminder === "Yes" &&
                                                    email === ""
                                                ) {
                                                    handleErrors("email");
                                                } else {
                                                    props.history.push("/");
                                                    form.resetForm();
                                                }
                                            }}
                                        >
                                            Save
                                        </StyledButton>
                                        <StyledButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                props.history.push("/");
                                                form.resetForm();
                                            }}
                                        >
                                            Cancel
                                        </StyledButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withRouter(NewVaccine);
