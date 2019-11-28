import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Dispatch } from "redux";

import { PrivateRoute, AuthRoute } from "../common/routes";
import { Header } from "../header";
import { Main } from "../main";
import { Home } from "../home";
import { Login, Register } from "../login";
import { VaccineList } from "../vaccines";
import { Settings } from "../settings";
import { FrequentlyAskedQuestions } from "../frequently-asked-questions";
import { receiveCurrentUser, SessionActionTypes } from "../../redux/actions/session";
import { Session } from "../../interfaces/session";
import { checkLoggedIn } from "../../utils/requests";

interface MapDispatchToProps {
    receiveCurrentUser: (session: Session) => SessionActionTypes;
}

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <Router>
                <CssBaseline />
                <Header />
                <Main>
                    <Switch>
                        <Route key="home" exact path="/" component={Home} />
                        <AuthRoute key="login" path="/login" component={Login} />
                        <AuthRoute key="register" path="/register" component={Register} />
                        <PrivateRoute
                            key="vaccines"
                            exact
                            path="/vaccines"
                            component={VaccineList}
                        />
                        <PrivateRoute key="settings" path="/settings" component={Settings} />
                        <Route
                            key="frequentlyAskedQuestions"
                            path="/frequently-asked-questions"
                            component={FrequentlyAskedQuestions}
                        />
                        // Redirect all invalid urls to home
                        <Redirect to="/" />
                    </Switch>
                </Main>
            </Router>
        );
    }

    async componentDidMount(): Promise<void> {
        const newState = await checkLoggedIn();
        if ((newState.session || {}).id != null) {
            this.props.receiveCurrentUser({
                id: newState.session.id
            });
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
    return {
        receiveCurrentUser: (session: Session) => dispatch(receiveCurrentUser(session))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(App);
