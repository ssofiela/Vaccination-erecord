import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { RootState } from "../../../redux/reducers";

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

interface MapStateToProps {
    isAuthenticated: boolean;
}

type Props = PrivateRouteProps & MapStateToProps;

const PrivateRoute: React.FC<Props> = (props) => {
    const Component = props.component;
    return (
        <Route
            path={props.path}
            exact={props.exact}
            render={(componentProps) =>
                props.isAuthenticated ? <Component {...componentProps} /> : <Redirect to="/login" />
            }
        />
    );
};

function mapStateToProps(state: RootState): MapStateToProps {
    return {
        isAuthenticated: Boolean(state.session.id)
    };
}

export default connect(mapStateToProps)(PrivateRoute);
