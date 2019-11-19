import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "react-router";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import useStyles from "../common/styles";
import * as Panel from "../common/panel";
import { FilledButton } from "../common/button";
import emailCheck from "../common/email-checker";
import { TextInput } from "../common/form-input";

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
        const errors = [];
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
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            }).then((response) => {
                valid = response.ok;
                /*props.userId = userId*/

                if (valid) {
                    props.history.push("/home");
                }
            });
        }
    };

    const [width, setWidth] = React.useState<number>(0);
    const mobile = (): boolean => {
        const isMobile = window.outerWidth <= 450;
        return isMobile;
    };
    const handleMobile = (): void => {
        if (window.outerWidth !== width) {
            setWidth(window.outerWidth);
            mobile();
        }
    };
    React.useEffect(() => {
        window.addEventListener("resize", handleMobile);
        //It is important to remove EventListener attached on window.
        () => window.removeEventListener("resize", handleMobile);
    }, [width]);

    return (
        // TODO mobile support
        //<Paper square className={mobile() ? classes.mobileContainer : classes.container}>
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
                            <TextInput
                                required
                                id="email"
                                name="Email"
                                autoComplete="email"
                                error={errors.includes("email")}
                                errorMessage={
                                    errors.includes("email") ? "Invalid email address" : ""
                                }
                                onChange={(event) => setEmail(event.target.value)}
                                tooltip="Example email address: email@example.com"
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextInput
                                required
                                id="password"
                                name="Password"
                                type="password"
                                error={errors.includes("password")}
                                errorMessage={errors.includes("password") ? "Invalid password" : ""}
                                onChange={(event) => setPassword(event.target.value)}
                                tooltip="A password should be at least 5 characters long, and may consist of uppercase and lowercase letter, numerals and other symbols."
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box className={classes.button}>
                                <FilledButton onClick={handleInputs2}>Register</FilledButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={mobile() ? classes.differentLine : classes.sameLine}>
                                <Typography>Already have an account?&nbsp;</Typography>
                                <Link
                                    underline="none"
                                    className={classes.link}
                                    onClick={() => props.history.push("/login")}
                                >
                                    <Typography>Log In</Typography>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Panel.Body>
        </Panel.Container>
    );
};

export default Register;
