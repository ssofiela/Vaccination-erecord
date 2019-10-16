import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

import { sidebarWidth } from "../../utils/constants";

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(8, 3, 3),
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: 0
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: sidebarWidth
        }
    })
);

/**
 * Outer container for the site
 * @param props
 * @constructor
 */
const Main: React.FC<MainProps> = props => {
    const classes = useStyles();
    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: props.sidebarOpen
            })}
        >
            {props.children}
        </main>
    );
};

Main.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Main;
