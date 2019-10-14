import React from "react";
import PropTypes from "prop-types";

interface NewVaccineProps {}

/**
 * Adding a new vaccine entry
 * @param props
 * @constructor
 */
const NewVaccine: React.FC<NewVaccineProps> = props => {
    return <div>{props.children}</div>;
};

NewVaccine.propTypes = {
    children: PropTypes.any
};

export default NewVaccine;
