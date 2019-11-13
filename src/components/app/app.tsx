import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "../header";
import { Main } from "../main";
import { Home } from "../home";
import { Login } from "../login";
import { VaccineList, NewVaccine } from "../vaccines";
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
                        <Route key="vaccines" exact path="/vaccines" component={VaccineList} />
                        <Route key="addVaccine" path="/add-vaccine" component={NewVaccine} />
                        <Route
                            key="frequentlyAskedQuestions"
                            path="/frequently-asked-questions"
                            component={FrequentlyAskedQuestions}
                        />
                    </Switch>
                </Main>
            </Router>
        );
    }
}

export default connect()(App);
