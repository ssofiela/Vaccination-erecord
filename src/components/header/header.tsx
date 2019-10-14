import React from "react";
import PropTypes from "prop-types";

interface HeaderProps {
    userId?: number;
}

/**
 * Header bar for the web service
 * @param props
 * @constructor
 */
const Header: React.FC<HeaderProps> = props => {
    return <div>{props.userId ? "Sign out" : "Sign in"}</div>;
};

Header.propTypes = {
    userId: PropTypes.number
};

export default Header;
