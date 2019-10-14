import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Header } from "../header";
import { Main } from "../main";
import { Home } from "../home";
import { Login } from "../login";
import { VaccineList } from "../vaccine-list";

interface Props {}

class App extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <Router>
                <Header />
                <Main>
                    <Switch>
                        <Route key="home" exact path="/" component={Home} />
                        <Route key="login" path="/login" component={Login} />
                        <Route
                            key="vaccines"
                            path="/vaccines"
                            component={VaccineList}
                        />
                    </Switch>
                </Main>
            </Router>
        );
    }
}

export default connect()(App);
