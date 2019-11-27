import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";

import { FilledButton } from "../common/button";
import * as Panel from "../common/panel";
import { Session } from "../../interfaces/session";
import { RootState } from "../../redux/reducers";

interface MapStateToProps {
    session: Session;
}

/**
 * Landing page of the site
 * @param props
 * @constructor
 */
type Props = RouteComponentProps & MapStateToProps;
const Home: React.FC<Props> = (props) => {
    return (
        <Grid item xs={12} sm={11} md={10}>
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
                                Vaccination eRecord is a free service that saves all your
                                vaccination information in one place to make them always available
                                to you.
                            </Typography>
                            <Typography>The services we offer includes:</Typography>
                            <ul>
                                <li>A summary of your vaccines in an easy to print format</li>
                                <li>Check your vaccine coverage when travelling</li>
                                <li>
                                    Subscribe for email reminders when a vaccine is due for a
                                    booster
                                </li>
                                <li>
                                    Pre-defined common vaccines for easy addition of new vaccines
                                </li>
                            </ul>
                            <Typography>
                                We do not store any personal information on our site. In fact, all
                                you need to register is an email address and a password.
                            </Typography>
                            <br />
                            <Typography>Upcoming features</Typography>
                            <ul>
                                <li>Manage several profiles (e.g. add your children)</li>
                                <li>
                                    Get personalized vaccination requirements by destination country
                                </li>
                                <li>
                                    Automatic vaccine proposals based on age and Finland’s
                                    vaccination program info
                                </li>
                            </ul>
                            <br />
                            <br />
                            {!props.session.id && (
                                <FilledButton
                                    onClick={() => {
                                        props.history.push("/register");
                                    }}
                                >
                                    Register
                                </FilledButton>
                            )}
                        </Panel.Body>
                    </Grid>
                </Grid>
            </Panel.Container>
        </Grid>
    );
};

function mapStateToProps(state: RootState): MapStateToProps {
    return {
        session: state.session
    };
}

export default withRouter(connect(mapStateToProps)(Home));
