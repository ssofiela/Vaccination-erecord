import React from "react";
import Box from "@material-ui/core/Box";

const Footer: React.FC = (props) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            bgcolor="#f9f9f9"
            p={2}
        >
            {props.children}
        </Box>
    );
};

export default Footer;
