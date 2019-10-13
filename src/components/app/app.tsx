import React from "react";
import { connect } from "react-redux";

interface Props {}

class App extends React.Component<Props> {
    render(): React.ReactNode {
        return <div>Vaccination eRecord app setup</div>;
    }
}

export default connect()(App);
