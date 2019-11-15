import React, {useEffect}from "react";
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
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Colorize from "@material-ui/icons/Colorize";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { RouteComponentProps, withRouter } from "react-router";
import VaccineName from "./vaccine-name";
import moment from "moment";


import ReminderCheck from "./reminder-check";
import { TextField } from "@material-ui/core";

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
          padding: "-64px -24px -24px !important"
        },
        header: {
            borderLeft: `7px solid ${theme.palette.primary.main}`
        },
        container: {
            margin: theme.spacing(2, 4),
            overFlowX: "auto",
            padding: "0px 0px 0px"
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

const NewVaccine: React.FC<RouteComponentProps> = props => {
    const classes = useStyles();
    const theme = useTheme();

    const [selectedDate, setSelectedDate] = React.useState<string>(
        moment().format()
    );
    const [selectedBoosterDate, setSelectedBoosterDate] = React.useState<string>(
        moment().format()
    );
    const [errors, setErrors] = React.useState<string[]>([]);

    const handleDateChange = (date: Date | null | any): void => {
        setSelectedDate(date);
        setErrors(errors.filter(err => err != "date"));
    };
    const handleBoosterDateChange = (date: Date | null | any): void => {
        setSelectedBoosterDate(date);
    };

    const [name, setName] = React.useState<string>("");
    const [nickName, setNickName] = React.useState<string>("");
    const [emailReminder, setReminder] = React.useState<string>("No");
    const [email, setEmail] = React.useState<string>("");

    const [comment, setComment] = React.useState<string>("");
    const [width, setWidth] = React.useState<number>(0);

    const handleComment = (event: string): void => {
        setComment(event);
    };

    const handleErrors = (newErrors: string[]): void => {
        setErrors([...errors, ...newErrors]);
    };

    const deleteNameError = (): void => {
        setErrors(errors.filter(err => err != "name"));
    };

    const moobile = (): boolean => {
        const isMobile = window.outerWidth <= 640;
        return isMobile;
    };
    const handleMobile = (): void => {
        if (window.outerWidth !== width) {
            setWidth(window.outerWidth);
            moobile();
        }

    };
    React.useEffect(() => {
        window.addEventListener("resize", handleMobile);

        //It is important to remove EventListener attached on window.
        () => window.removeEventListener("resize", handleMobile);
    }, [width])


    return (
        <Paper square className={moobile() ? classes.content : classes.container}>
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
                                href="/vaccines"
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
            {moobile() ?
                (
                    <Grid container>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="row"
                                p={3}
                            >
                                <VaccineName
                                    sidebarOpen
                                    updateName={(
                                        name: string
                                    ): void => {
                                        deleteNameError();
                                        setName(name);
                                    }}
                                    error={
                                        errors.includes("name")
                                            ? "name"
                                            : ""
                                    }
                                    type={"name"}
                                />
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="row"
                                p={3}
                            >
                                <VaccineName
                                    sidebarOpen
                                    updateName={(
                                        name: string
                                    ): void => {
                                        setNickName(name);
                                    }}
                                    error={
                                        errors.includes("name")
                                            ? "name"
                                            : ""
                                    }
                                    type={"nickname"}
                                />
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="row"
                                p={3}
                            >
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                >
                                    <Grid container>
                                        <KeyboardDatePicker
                                            name="date"
                                            autoOk={
                                                !errors.includes(
                                                    "date"
                                                )
                                            }
                                            error={errors.includes("date")}
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="dense"
                                            id="date-picker"
                                            label="Date*"
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
                                p={3}
                            >
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                >
                                    <Grid container>
                                        <KeyboardDatePicker
                                            name="date"
                                            autoOk={
                                                !errors.includes(
                                                    "date"
                                                )
                                            }
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="dense"
                                            id="date-picker"
                                            label="Booster date"
                                            value={selectedBoosterDate}
                                            onChange={event =>
                                                handleBoosterDateChange(
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
                                p={3}
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
                            <Box
                                display="flex"
                                flexDirection="row"
                                p={1}
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
                                            const invalidName: boolean =
                                                name === "";
                                            const invalidEmail: boolean =
                                                emailReminder === "Yes" &&
                                                email === "";
                                            const invalidDate: boolean =
                                                selectedDate.toString().split("T")[0] ===
                                                moment().format().split("T")[0];
                                            const invalid: boolean =
                                                invalidName ||
                                                invalidEmail ||
                                                invalidDate;
                                            let newErrors: string[] = [];
                                            if (invalidName) {
                                                newErrors.push("name");
                                            }
                                            if (invalidEmail) {
                                                newErrors.push("email");
                                            }
                                            if (invalidDate) {
                                                newErrors.push("date");
                                            }
                                            handleErrors(newErrors);
                                            if (!invalid) {
                                                props.history.push("/vaccines");
                                            }
                                        }}
                                    >
                                        Save
                                    </StyledButton>
                                    <StyledButton
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            props.history.push("/vaccines");
                                        }}
                                    >
                                        Cancel
                                    </StyledButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                )
                :
                <Grid container>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            flexDirection={"row"}
                            p={5}
                        >
                            <Grid item xs={6}>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    p={5}
                                >
                                    <VaccineName
                                        sidebarOpen
                                        updateName={(
                                            name: string
                                        ): void => {
                                            deleteNameError();
                                            setName(name);
                                        }}
                                        error={
                                            errors.includes("name")
                                                ? "name"
                                                : ""
                                        }
                                        type={"name"}
                                    />
                                </Box>
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
                                                autoOk={
                                                    !errors.includes(
                                                        "date"
                                                    )
                                                }
                                                error={errors.includes("date")}
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="dense"
                                                id="date-picker"
                                                label="Date*"
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
                                    <VaccineName
                                        sidebarOpen
                                        updateName={(
                                            name: string
                                        ): void => {
                                            setNickName(name);
                                        }}
                                        error={
                                            errors.includes("name")
                                                ? "name"
                                                : ""
                                        }
                                        type={"nickname"}
                                    />
                                </Box>
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
                                                autoOk={
                                                    !errors.includes(
                                                        "date"
                                                    )
                                                }
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="dense"
                                                id="date-picker"
                                                label="Booster date"
                                                value={selectedBoosterDate}
                                                onChange={event =>
                                                    handleBoosterDateChange(
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
                                        const invalidName: boolean =
                                            name === "";
                                        const invalidEmail: boolean =
                                            emailReminder === "Yes" &&
                                            email === "";
                                        const invalidDate: boolean =
                                            selectedDate.toString().split("T")[0] ===
                                            moment().format().split("T")[0];
                                        const invalid: boolean =
                                            invalidName ||
                                            invalidEmail ||
                                            invalidDate;
                                        let newErrors: string[] = [];
                                        if (invalidName) {
                                            newErrors.push("name");
                                        }
                                        if (invalidEmail) {
                                            newErrors.push("email");
                                        }
                                        if (invalidDate) {
                                            newErrors.push("date");
                                        }
                                        handleErrors(newErrors);
                                        if (!invalid) {
                                            props.history.push("/vaccines");
                                        }
                                    }}
                                >
                                    Save
                                </StyledButton>
                                <StyledButton
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                        props.history.push("/vaccines");
                                    }}
                                >
                                    Cancel
                                </StyledButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Paper>
    );
};
export default withRouter(NewVaccine);
