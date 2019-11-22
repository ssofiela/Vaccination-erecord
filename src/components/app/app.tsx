import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "../header";
import { Main } from "../main";
import { Home } from "../home";
import { Login, Register } from "../login";
import { VaccineList, NewVaccine } from "../vaccines";
import { Settings } from "../settings"
import { FrequentlyAskedQuestions } from "../frequently-asked-questions";

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <Router>
                <CssBaseline />
                <Header />
                <Main>
                    <Switch>
                        <Route key="home" exact path="/" component={Home} />
                        <Route key="login" path="/login" component={Login} />
                        <Route key="register" path="/register" component={Register} />
                        <Route key="vaccines" exact path="/vaccines" component={VaccineList} />
                        <Route key="settings" path="/settings" component={Settings} />
                        <Route
                            key="frequentlyAskedQuestions"
                            path="/frequently-asked-questions"
                            component={FrequentlyAskedQuestions}
                        />
                        <Route key="settings" path="/" component={Settings} /> /* Makes that invalid urls goes to login page */
                    </Switch>
                </Main>
            </Router>
        );
    }
}

export default connect()(App);
