import React from "react";
import "date-fns";
import { makeStyles, styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps,  } from "react-router";
import Box from "@material-ui/core/Box";
import { theme } from "../../utils/theme";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Colorize from "@material-ui/core/SvgIcon/SvgIcon";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
        maxWidth: 100
    },
    header: {
        borderLeft: `7px solid ${theme.palette.primary.main}`
    },
    container: {
        margin: theme.spacing(2, 4),
        overFlowX: "auto",
    },
    link: {
        display: "flex"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        maxWidth: 300
    },
    sameLine: {
        flexDirection:"row",
        display: "flex"
    },
    margin: {
        margin: theme.spacing(1),
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


    const infoButtonPassword = () => {
        console.log("infor click")
    };


/* Check that email address and the password are valid */
    const handleInputs = (): void => {
        let errors = [];
        const expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!expression.test(email)) {
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

    const StyledColorize = styled(Colorize)({
        marginRight: "10px"
    });

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
                                href="/register"
                                className={classes.link}
                            >
                                <StyledColorize />
                                Sign Up
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

                            <div className={classes.sameLine}>
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
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                />
                                <Tooltip title="Email address must be valid (email@example.com)" >
                                    <IconButton aria-label="help" size="small" className={classes.margin}>
                                        <HelpOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            p={2}
                        >
                            <div className={classes.sameLine}>
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
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                />
                                <Tooltip title="Password must include: length must be more than 6, upper case, lower case, numerals and other symbol." >
                                    <IconButton onClick={infoButtonPassword} aria-label="delete" className={classes.margin} size="small">
                                        <HelpOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            p={2}
                        >
                            <Grid container>
                                <Grid item>
                                    <div className={classes.sameLine}>
                                        <div>Already have an account?</div>
                                        <Link onClick={() => props.history.push("/login")}  variant="h6">
                                            {"Sign In"}
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
                                onClick={handleInputs}
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

export default Register;



