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
import { Formik } from "formik";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Colorize from "@material-ui/icons/Colorize";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { RouteComponentProps, withRouter } from "react-router";
import ReminderCheck from "../vaccines/reminder-check"


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

const Settings: React.FC<RouteComponentProps> = props => {
    const classes = useStyles();
    const theme = useTheme();

    const [errors, setErrors] = React.useState<string[]>([]);

    const [emailReminder, setReminder] = React.useState<string>("No");
    const [email, setEmail] = React.useState<string>("");

    const handleErrors = (newErrors: string[]): void => {
        console.log([...errors, ...newErrors]);
        setErrors([...errors, ...newErrors]);
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
                                Settings
                            </Link>
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
                                                const invalidEmail: boolean =
                                                    emailReminder === "Yes" &&
                                                    email === "";
                                                const invalid: boolean =
                                                    invalidEmail;
                                                let newErrors: string[] = [];
                                                if (invalidEmail) {
                                                    newErrors.push("email");
                                                }
                                                handleErrors(newErrors);
                                                if (!invalid) {
                                                    props.history.push("/settings");
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

export default withRouter(Settings);
