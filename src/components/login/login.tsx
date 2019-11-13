import React from "react";
import PropTypes from "prop-types";

/**
 * Login page
 * @param props
 * @constructor
 */
const Login: React.FC = (props) => {
    return <div>{props.children}</div>;
};

Login.propTypes = {
    children: PropTypes.any
};

export default Login;
