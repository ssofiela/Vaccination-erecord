import React from "react";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { RouteComponentProps, withRouter } from "react-router";

import * as Panel from "../common/panel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            backgroundColor: theme.palette.background.default,
            borderRadius: 0,
            borderWidth: "2px"
        }
    })
);

const StyledButton = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.default,
            borderRadius: 0,
            borderWidth: "2px",
            "&:hover": {
                borderWidth: "2px"
            }
        }
    })
)(Button);

/**
 * Landing page of the site
 * @param props
 * @constructor
 */
const Home: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    return (
        <Panel.Container>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Header>
                        <Typography>Why Vaccination eRecord?</Typography>
                    </Panel.Header>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Body>
                        <Typography>
                            Vaccination eRecord is a service that saves all your vaccination
                            information in one place to make them always available to you.
                        </Typography>
                        <Typography>The services we offer include:</Typography>
                        <ul>
                            <li>A summary of your vaccines in an easy to print format</li>
                            <li>Email reminders when a vaccine is due for a booster</li>
                        </ul>
                        <Typography>
                            We do not store any personal information on our site. In fact, all you
                            need to register is an email address an a password.
                        </Typography>
                    </Panel.Body>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Footer>
                        <StyledButton
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                props.history.push("/register");
                            }}
                        >
                            Register
                        </StyledButton>
                    </Panel.Footer>
                </Grid>
            </Grid>
        </Panel.Container>
    );
};

export default withRouter(Home);
