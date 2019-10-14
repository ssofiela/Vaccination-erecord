import React from "react";
import PropTypes from "prop-types";

interface MainProps {}

/**
 * Outer container for the site
 * @param props
 * @constructor
 */
const Main: React.FC<MainProps> = props => {
    return <>{props.children}</>;
};

Main.propTypes = {
    children: PropTypes.any
};

export default Main;
