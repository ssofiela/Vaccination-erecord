import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "../header";
import { Main } from "../main";
//Import { Home } from "../home";
import { Login } from "../login";
import { VaccineList } from "../vaccines";
import { NewVaccine } from "../vaccines";

interface Props {}

interface State {
    sidebarOpen: boolean;
}

class App extends React.Component<Props, State> {
    state = {
        sidebarOpen: false
    };

    handleSidebarOpen = (): void => {
        this.setState({ sidebarOpen: true });
    };

    handleSidebarClose = (): void => {
        this.setState({ sidebarOpen: false });
    };

    render(): React.ReactNode {
        return (
            <Router>
                <CssBaseline />
                <Header
                    handleSidebarOpen={this.handleSidebarOpen}
                    handleSidebarClose={this.handleSidebarClose}
                    sidebarOpen={this.state.sidebarOpen}
                />
                <Main sidebarOpen={this.state.sidebarOpen}>
                    <Switch>
                        {/* TODO add back when demo is over
                            <Route key="home" exact path="/" component={Home}/>
                        */}
                        <Route key="login" path="/login" component={Login} />
                        <Route
                            key="vaccines"
                            path="/" // TODO change back to "/vaccines" when demo is over
                            component={VaccineList}
                        />
                        <Route
                            key="addvaccine"
                            path="/addvaccine"
                            component={NewVaccine}
                        />
                    </Switch>
                </Main>
            </Router>
        );
    }
}

export default connect()(App);
