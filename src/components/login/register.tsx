import React from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { RouteComponentProps,  } from "react-router";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#0fa7bf",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register: React.FC<RouteComponentProps> = props => {
    const classes = useStyles();

    const [errors, setErrors] = React.useState<string[]>([]);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const handleErrors = (newErrors: string[]): void => {
        setErrors(newErrors);
    };

/*
DO: jonkunlainen infolappu
At least 6
English Upper Case
English Lower Case
Numerals
Non-Alphanumeric (Punctuation marks and other symbols)
*/


/* Check that email address and the password are valid */
    const handleInputs = (): void => {
        let errors = [];
        const expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!expression.test(email)) {
            errors.push("email");
        }

        const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/
        if (password.length < 6 || password.toLocaleLowerCase() === password.toLocaleUpperCase() ||
            !password.match(symbols) || !password.match("[0-9]+")) {
            errors.push("password")
        }
        handleErrors(errors);
        if (errors.length === 0){
            /* email address and password is correct in here */
            props.history.push("/home")
        }

    };


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        helperText={errors.includes("email") && "Invalid email address"}
                        onChange={event =>
                            setEmail(event.target.value)
                        }
                    />
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
                        onChange={event =>
                            setPassword(event.target.value)
                        }
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleInputs}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link variant="h6">
                                {"Have an account already? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Register;



