import React from "react";
import PropTypes from "prop-types";

interface VaccinesProps {}

/**
 * User's vaccine list
 * @param props
 * @constructor
 */
const VaccineList: React.FC<VaccinesProps> = props => {
    return <div>{props.children}</div>;
};

VaccineList.propTypes = {
    children: PropTypes.any
};

export default VaccineList;
