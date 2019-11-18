import React from "react";
import "date-fns";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps,  } from "react-router";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import { theme } from "../../utils/theme";
import useStyles from "../common/styles"

const Login: React.FC<RouteComponentProps> = props => {
    const classes = useStyles();

    const [error, setError] = React.useState<boolean>(false);
    const handleBack = (): void => {
        let valid = true;
        /* Check that email address match with the password */
        fetch("https://vaccine-backend.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email,
                password: password
            }),
            credentials: 'include',
        }).then(response => {return response.json()})
        .then( data => {
            valid = data.status === "Authorized";
            console.log("login", data);

            if (valid) {
                props.history.push("/home");
            } else {
                setError(true)
            }
        })


    };
    const [width, setWidth] = React.useState<number>(0);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
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
                                className={classes.link}
                            >
                                Sign In
                            </Link>
                        </Breadcrumbs>
                    </Box>
                </Grid>
            </Grid>
            <form className={classes.form} noValidate>
                <Grid container>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            p={2}
                        >
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
                                onChange={event =>
                                    setEmail(event.target.value)
                                }
                            />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            p={2}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                className={classes.textField}
                                helperText={error && "Incorrect email address or password"}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                            />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            p={2}
                        >
                            <Grid container>
                                <Grid item>
                                    <div className={moobile() ? classes.differentLine : classes.sameLine}>
                                        <div>New to Vaccination eRecord? </div>
                                        <Link onClick={() => props.history.push("/register")} >
                                            {" Sign Up"}
                                        </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            p={3}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleBack}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default Login;



