import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
    render() {
        return (
            <div>Vaccination eRecord app setup</div>
        );
    }
};


export default connect()(App)