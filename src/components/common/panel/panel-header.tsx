import React from "react";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            borderLeft: `7px solid ${theme.palette.primary.main}`
        }
    })
);

const Header: React.FC = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Box
            className={classes.header}
            display="flex"
            flexDirection="row"
            bgcolor={theme.palette.secondary.main}
            p={1.5}
        >
            {props.children}
        </Box>
    );
};

export default Header;
