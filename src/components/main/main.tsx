import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface MainProps {
    children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            padding: theme.spacing(10, 3, 3)
        }
    })
);

/**
 * Outer container for the site
 * @param props
 * @constructor
 */
const Main: React.FC<MainProps> = (props) => {
    const classes = useStyles();
    return <div className={classes.content}>{props.children}</div>;
};

Main.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Main;
