import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import { TextField } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "react-router";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import useStyles from "../common/styles";
import * as Panel from "../common/panel";
import { FilledButton } from "../common/button";
import emailCheck from "../common/emailChecker"

const Register: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();

    const [errors, setErrors] = React.useState<string[]>([]);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const handleErrors = (newErrors: string[]): void => {
        setErrors(newErrors);
    };

    /* Check that email address and the password are valid */
    const handleInputs2 = (): void => {
        const emailValid = emailCheck(email);
        let errors = [];
        if (!emailValid) {
            errors.push("email");
        }

        /*
        Password:
            At least 6
            English Upper Case
            English Lower Case
            Numerals
            Non-Alphanumeric (Punctuation marks and other symbols)
        */
        const symbols = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/;
        if (
            password.length < 6 ||
            password.toLocaleLowerCase() === password.toLocaleUpperCase() ||
            !password.match(symbols) ||
            !password.match("[0-9]+")
        ) {
            errors.push("password");
        }
        handleErrors(errors);
        if (errors.length === 0) {
            let valid = true;
            fetch("https://vaccine-backend.herokuapp.com/api/user/create", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            }).then(response => {
                valid = response.ok;
                /*props.userId = userId*/

                if (valid) {
                    props.history.push("/home");
                }
            })
        }
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
        // TODO mobile support
        //<Paper square className={moobile() ? classes.mobileContainer : classes.container}>
        <Panel.Container>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Header>
                        <Typography>Register</Typography>
                    </Panel.Header>
                </Grid>
            </Grid>
            <Panel.Body>
                <form className={classes.form} noValidate>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                className={classes.textField}
                                helperText={errors.includes("email") && "Invalid email address"}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <Tooltip title="Example email address: email@example.com">
                                <IconButton
                                    aria-label="help"
                                    size="small"
                                    className={classes.margin}
                                >
                                    <HelpOutlineOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                helperText={errors.includes("password") && "Invalid password"}
                                id="password"
                                autoComplete="current-password"
                                className={classes.textField}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Tooltip title="Password required: more than 5 marks and upper case, lower case, numerals and other symbol.">
                                <IconButton
                                    aria-label="delete"
                                    className={classes.margin}
                                    size="small"
                                >
                                    <HelpOutlineOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <div
                                    className={
                                        moobile() ? classes.differentLine : classes.sameLine
                                    }
                                >
                                    <Typography>Already have an account?</Typography>
                                    <Link onClick={() => props.history.push("/login")}>
                                        <Typography>{" Log In"}</Typography>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <FilledButton
                                    onClick={handleInputs2}
                                >
                                    Sign In
                                </FilledButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default Register;
