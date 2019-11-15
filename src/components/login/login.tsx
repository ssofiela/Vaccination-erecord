import React from "react";
import "date-fns";
import { makeStyles, styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { RouteComponentProps,  } from "react-router";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Colorize from "@material-ui/core/SvgIcon/SvgIcon";
import { theme } from "../../utils/theme";


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
    }
}));

const Login: React.FC<RouteComponentProps> = props => {
    const classes = useStyles();

    const [error, setError] = React.useState<boolean>(false);
    const handleBack = (): void => {
        const valid = true; /* Check that email address match with the password */
        if (valid) {
            props.history.push("home");
        } else {
            setError(true)
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
                                href="/login"
                                className={classes.link}
                            >
                                <StyledColorize />
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
                            />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            p={2}
                        >
                            <Grid container>
                                <Grid item>
                                    <div className={classes.sameLine}>
                                        <div>New to Vaccination eRecord?</div>
                                        <Link onClick={() => props.history.push("/register")}  variant="h6">
                                            {"Sign Up"}
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



