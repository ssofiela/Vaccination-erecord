import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            borderLeft: `7px solid ${theme.palette.primary.main}`,
        }
    })
);

const Header: React.FC<BoxProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Box
            className={classes.header}
            display="flex"
            flexDirection="row"
            alignItems="center"
            bgcolor={theme.palette.secondary.main}
            p={props.p ? props.p : 1.5}
        >
            {props.children}
        </Box>
    );
};

export default Header;
