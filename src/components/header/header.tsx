import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { Sidebar } from "./sidebar";

interface HeaderProps {
    userId?: number;
    sidebarOpen: boolean;
    handleSidebarOpen: () => void;
    handleSidebarClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            borderBottom: "2px solid #f9f9f9"
        },
        iconButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    })
);

/**
 * Header bar for the web service
 * @param props
 * @constructor
 */
const Header: React.FC<HeaderProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                elevation={0}
                position="fixed"
                color="inherit"
                className={classes.appBar}
            >
                <Toolbar variant="dense">
                    {props.sidebarOpen ? (
                        <IconButton
                            edge="start"
                            className={classes.iconButton}
                            onClick={props.handleSidebarClose}
                            aria-label="close sidebar"
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            edge="start"
                            className={classes.iconButton}
                            onClick={props.handleSidebarOpen}
                            aria-label="open sidebar"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        className={classes.title}
                        color="primary"
                    >
                        Vaccination eRecord
                    </Typography>
                    {/* TODO remove comments when users can sign in
                        <Button color="inherit">
                            {props.userId ? "Sign out" : "Sign in"}
                        </Button>
                        */}
                </Toolbar>
            </AppBar>
            <Sidebar
                open={props.sidebarOpen}
                handleClose={props.handleSidebarClose}
            />
        </div>
    );
};

Header.propTypes = {
    userId: PropTypes.number,
    sidebarOpen: PropTypes.bool.isRequired,
    handleSidebarOpen: PropTypes.func.isRequired,
    handleSidebarClose: PropTypes.func.isRequired
};

export default Header;
