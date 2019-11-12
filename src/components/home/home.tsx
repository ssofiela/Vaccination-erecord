import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

/**
 * Landing page of the site
 * @param props
 * @constructor
 */
const Home: React.FC = (props) => {
    return (
        <div>
            {props.children}
            <Typography>TODO</Typography>
        </div>
    );
};

Home.propTypes = {
    children: PropTypes.any
};

export default Home;
