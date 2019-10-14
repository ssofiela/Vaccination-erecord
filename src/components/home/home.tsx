import React from "react";
import PropTypes from "prop-types";

interface HomeProps {}

/**
 * Landing page of the site
 * @param props
 * @constructor
 */
const Home: React.FC<HomeProps> = props => {
    return <div>{props.children}</div>;
};

Home.propTypes = {
    children: PropTypes.any
};

export default Home;
