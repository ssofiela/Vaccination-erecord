import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router";

import { RootState } from "../../../redux/reducers";

interface AuthRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

interface MapStateToProps {
    isAuthenticated: boolean;
}

type Props = AuthRouteProps & MapStateToProps;

const AuthRoute: React.FC<Props> = (props) => {
    const Component = props.component;
    return (
        <Route
            path={props.path}
            exact={props.exact}
            render={(componentProps) =>
                props.isAuthenticated ? <Redirect to="/" /> : <Component {...componentProps} />
            }
        />
    );
};

function mapStateToProps(state: RootState): MapStateToProps {
    return {
        isAuthenticated: Boolean(state.session.id)
    };
}

export default connect(mapStateToProps)(AuthRoute);
