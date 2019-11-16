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
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Colorize from "@material-ui/icons/Colorize";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { RouteComponentProps, withRouter } from "react-router";
import Birthday from "./birthday";
import { InputLabel, TextField } from "@material-ui/core";
import Reminder from "./reminder";


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
        },
        mobileContainer: {
            margin: theme.spacing(2, 0),
            overFlowX: "auto",
        },
        link: {
            display: "flex"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200
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
        },
        dotted: {
            width: "100%",
            borderWidth: 2,
            borderColor: theme.palette.secondary.main,
            borderStyle: "dashed",
            marginTop: 40,
            marginBottom: 40
        },
        textField2: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: 200,
        },
        margin: {
            marginTop: 30,
        },
        marginDouble: {
            marginBottom: 30
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

    const [email, setEmail] = React.useState<string>("email@example.com");
    const [editStatus, setEditStatus] = React.useState<boolean>(false);
    const [birthday, setBirthday] = React.useState<number>(0);
    const [reminder, setReminder] = React.useState<number>(0);

    const handleErrors = (newErrors: string[]): void => {
        setErrors([...errors, ...newErrors]);
    };
    const [width, setWidth] = React.useState<number>(0);
    const moobile = (): boolean => {
        const isMobile = window.outerWidth <= 450;
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
    }, [width]);

    return (
        <Paper square className={moobile() ? classes.mobileContainer : classes.container}>
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
                    <Box
                        display="flex"
                        flexDirection="column"
                        p={5}
                    >
                        <div className={classes.marginDouble}>Personal information</div>

                        <Birthday
                            sidebarOpen
                            updateBirthday={(
                                birthday: number
                            ): void => {
                                setBirthday(birthday)
                            }}
                            editStatus={editStatus}
                            type="birthday"
                        />
                        <div className={classes.dotted}></div>
                        <div className={classes.marginDouble}>Reminder settings</div>
                        <Reminder
                            sidebarOpen
                            updateBirthday={(
                                reminder: string
                            ): void => {
                                setReminder(reminder)
                            }}
                            editStatus={editStatus}
                            type="reminder"
                        />
                        <InputLabel id="demo-simple-select-label"
                            className={classes.margin}>
                            Email address for reminder
                        </InputLabel>
                        <TextField
                            className={classes.textField2}
                            value={email === "email@example.com" ? "" : email}
                            onChange={event =>
                                setEmail(event.target.value)
                            }
                            disabled={!editStatus}
                        />
                    </Box>

                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent={editStatus ? "flex-end" : "flex-start"}
                            bgcolor="#f9f9f9"
                            p={2}
                        >
                            {!editStatus ?
                                <StyledButton
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                        setEditStatus(true)
                                    }}
                                >
                                    Edit
                                </StyledButton>
                                :
                                <div>
                                    <StyledButton
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            /* states -> back-end */
                                            props.history.push("/settings");
                                            setEditStatus(false)
                                        }}
                                    >
                                        Save
                                    </StyledButton>
                                    <StyledButton
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            /* Get the old data from back-end */
                                            props.history.push("/settings");
                                            setEditStatus(false)
                                        }}
                                    >
                                        Cancel
                                    </StyledButton>
                                </div>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withRouter(Settings);
