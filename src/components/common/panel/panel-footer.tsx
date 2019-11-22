import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";

const Footer: React.FC<BoxProps> = (props) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            bgcolor="#f9f9f9"
            p={2}
            {...props}
        >
            {props.children}
        </Box>
    );
};

export default Footer;
