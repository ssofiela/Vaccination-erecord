import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps, withRouter } from "react-router";

import { FilledButton } from "../common/button";
import * as Panel from "../common/panel";

/**
 * Landing page of the site
 * @param props
 * @constructor
 */
const Home: React.FC<RouteComponentProps> = (props) => {
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
                        <Typography>TODO: other content</Typography>
                        <br />
                        <br />
                        <FilledButton
                            onClick={() => {
                                props.history.push("/register");
                            }}
                        >
                            Register
                        </FilledButton>
                    </Panel.Body>
                </Grid>
            </Grid>
        </Panel.Container>
    );
};

export default withRouter(Home);
