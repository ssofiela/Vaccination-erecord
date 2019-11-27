import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { RouteComponentProps } from "react-router";
import * as Redux from "redux";
import { connect } from "react-redux";

import { receiveCurrentUser, SessionActionTypes } from "../../redux/actions/session";
import { login } from "../../utils/requests";
import { Session } from "../../interfaces/session";
import useStyles from "../common/styles";
import * as Panel from "../common/panel";
import { FilledButton } from "../common/button";
import { TextInput } from "../common/form-input";

interface MapDispatchToProps {
    receiveCurrentUser: (session: Session) => SessionActionTypes;
}

type Props = MapDispatchToProps & RouteComponentProps;

const Login: React.FC<Props> = (props) => {
    const classes = useStyles();

    const [width, setWidth] = React.useState<number>(0);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<boolean>(false);
    const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        login({ email: email, password: password }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    props.receiveCurrentUser({
                        id: data.id
                    });
                    props.history.push("/vaccines");
                });
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
        <Grid item xs={12} sm={8} md={6}>
            <Panel.Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Panel.Header>
                            <Typography>Log in</Typography>
                        </Panel.Header>
                    </Grid>
                </Grid>
                <Panel.Body>
                    <form onSubmit={handleLogin} className={classes.form} noValidate>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextInput
                                    id="email"
                                    name="Email"
                                    autoComplete="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    error={error}
                                    errorMessage={
                                        error ? "Incorrect email address or password." : ""
                                    }
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
                                    errorMessage={
                                        error ? "Incorrect email address or password." : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box className={classes.button}>
                                    <FilledButton type="submit">Log In</FilledButton>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <div
                                    className={moobile() ? classes.differentLine : classes.sameLine}
                                >
                                    <Typography>New to Vaccination eRecord?&nbsp;</Typography>
                                    <Link
                                        underline="none"
                                        className={classes.link}
                                        onClick={() => props.history.push("/register")}
                                    >
                                        <Typography>Register</Typography>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Panel.Body>
            </Panel.Container>
        </Grid>
    );
};

function mapDispatchToProps(dispatch: Redux.Dispatch): MapDispatchToProps {
    return {
        receiveCurrentUser: (session: Session) => dispatch(receiveCurrentUser(session))
    };
}

export default connect(null, mapDispatchToProps)(Login);
