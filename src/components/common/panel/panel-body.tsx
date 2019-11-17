import React from "react";
import Box from "@material-ui/core/Box";

const Body: React.FC = (props) => {
    return <Box p={5}>{props.children}</Box>;
};

export default Body;
