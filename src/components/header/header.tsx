import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { createStyles, makeStyles, Theme, useMediaQuery, useTheme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Colorize from "@material-ui/icons/Colorize";
import SettingsIcon from "@material-ui/icons/Settings";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Session } from "../../interfaces/session";
import { logoutCurrentUser, SessionActionTypes } from "../../redux/actions/session";
import { RootState } from "../../redux/reducers";
import { logout } from "../../utils/requests";
import { clearStoredUser, UserActionTypes } from "../../redux/actions/user";

interface HeaderProps {
    userId?: number;
}

interface MapStateToProps {
    session: Session;
}

interface MapDispatchToProps {
    logoutCurrentUser: () => SessionActionTypes;
    clearStoredUser: () => UserActionTypes;
}

type Props = HeaderProps & RouteComponentProps & MapDispatchToProps & MapStateToProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.95rem",
                fontWeight: "500"
            }
        },
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
        button: {
            [theme.breakpoints.down("xs")]: {
                textTransform: "none"
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.85rem"
            }
        },
        tabContainer: {
            flexGrow: 1,
            width: "100%"
        },
        tab: {
            minWidth: "115px",
            [theme.breakpoints.down("sm")]: {
                textTransform: "none",
                fontSize: "0.85rem",
                fontWeight: "400",
                minWidth: "105px"
            },
            [theme.breakpoints.down("xs")]: {
                minWidth: "40px"
            }
        }
    })
);

/**
 * Header bar for the web service
 * @param props
 * @constructor
 */
const Header: React.FC<Props> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));

    const initialValue = props.location.pathname !== "/login" ? props.location.pathname : "/";
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        const pathname = props.location.pathname !== "/login" ? props.location.pathname : "/";
        if (value != pathname) {
            setValue(pathname);
        }
    });

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: string): void => {
        setValue(newValue);
        props.history.push(newValue);
    };
    const handleLogin = (): void => {
        props.history.push("/login");
    };

    const handleLogout = (): void => {
        logout().then((response) => {
            if (response.ok) {
                props.logoutCurrentUser();
                props.clearStoredUser();
                props.history.push("/");
            }
        });
    };

    return (
        <div className={classes.root}>
            <AppBar elevation={0} position="fixed" color="inherit" className={classes.appBar}>
                <Toolbar variant="dense">
                    <a href="/">
                        <img
                            src="img/vaccine.png"
                            style={{ marginRight: "1em", width: "2em", verticalAlign: "middle" }}
                        />
                    </a>
                    {!mobile && (
                        <Typography variant="h6" color="primary" className={classes.title}>
                            Vaccination eRecord
                        </Typography>
                    )}
                    <div className={classes.tabContainer}>
                        <Tabs
                            // Don't activate any of the tabs if page don't have its own tab (e.g. registration)
                            value={
                                [
                                    "/",
                                    "/vaccines",
                                    "/settings",
                                    "/frequently-asked-questions"
                                ].includes(value)
                                    ? value
                                    : false
                            }
                            variant="fullWidth"
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            aria-label="tabs"
                        >
                            <Tab
                                className={classes.tab}
                                icon={<HomeIcon />}
                                label={!mobile ? "Home" : undefined}
                                value="/"
                            />
                            <Tab
                                className={classes.tab}
                                icon={<Colorize />}
                                label={!mobile ? "My vaccines" : undefined}
                                disabled={!props.session.id}
                                value="/vaccines"
                            />
                            <Tab
                                className={classes.tab}
                                icon={<SettingsIcon />}
                                label={!mobile ? "Settings" : undefined}
                                disabled={!props.session.id}
                                value="/settings"
                            />
                            <Tab
                                className={classes.tab}
                                icon={<ContactSupportIcon />}
                                label={!mobile ? "FAQ" : undefined}
                                value="/frequently-asked-questions"
                            />
                        </Tabs>
                    </div>
                    {props.session.id ? (
                        <Button className={classes.button} color="inherit" onClick={handleLogout}>
                            Log out
                        </Button>
                    ) : (
                        <Button className={classes.button} color="inherit" onClick={handleLogin}>
                            Log in
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

function mapStateToProps(state: RootState): MapStateToProps {
    return {
        session: state.session
    };
}

function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
    return {
        logoutCurrentUser: () => dispatch(logoutCurrentUser()),
        clearStoredUser: () => dispatch(clearStoredUser())
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header)
);
