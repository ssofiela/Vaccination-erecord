import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { RouteComponentProps } from "react-router";

import useStyles from "../common/styles";
import * as Panel from "../common/panel";
import { FilledButton } from "../common/button";
import { TextInput } from "../common/form-input";

const Login: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();

    const [width, setWidth] = React.useState<number>(0);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<boolean>(false);
    const handleBack = (): void => {
        let valid = true;
        /* Check that email address match with the password */
        fetch("https://vaccine-backend.herokuapp.com/api/login", {
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
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                valid = data.status === "Authorized";

                if (valid) {
                    props.history.push("/home");
                } else {
                    setError(true);
                }
            });
    };

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
        // <Paper square className={moobile() ? classes.mobileContainer : classes.container}>
        <Panel.Container>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Header>
                        <Typography>Log in</Typography>
                    </Panel.Header>
                </Grid>
            </Grid>
            <Panel.Body>
                <form className={classes.form} noValidate>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextInput
                                id="email"
                                name="Email"
                                autoComplete="email"
                                onChange={(event) => setEmail(event.target.value)}
                                error={error}
                                errorMessage={error ? "Incorrect email address or password." : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextInput
                                id="password"
                                name="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={(event) => setPassword(event.target.value)}
                                error={error}
                                errorMessage={error ? "Incorrect email address or password." : ""}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box className={classes.button}>
                                <FilledButton onClick={handleBack}>Log In</FilledButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <div className={moobile() ? classes.differentLine : classes.sameLine}>
                                <Typography>New to Vaccination eRecord?</Typography>
                                <Link onClick={() => props.history.push("/register")}>
                                    <Typography>{" Register"}</Typography>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Panel.Body>
        </Panel.Container>
    );
};

export default Login;
