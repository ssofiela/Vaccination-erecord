import React from "react";
import PropTypes from "prop-types";
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
import { compose, Dispatch } from "redux";

import { UserState } from "../../interfaces/user";
import { storeUserId } from "../../redux/actions/user";

interface HeaderProps {
    userId?: number;
}

type Props = HeaderProps & RouteComponentProps & DispatchProps;

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

    const [value, setValue] = React.useState("/");
    const [id, setId] = React.useState<number>(0);

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: string): void => {
        setValue(newValue);
        props.history.push(newValue);
    };
    const handleLogin = (): void => {
        if (id == 0) {
            props.history.push("/login");
        } else {
            /* Sign out */
            fetch("https://vaccine-backend.herokuapp.com/api/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(() => {
                setId(0);
                props.history.push("/login");
            });
        }
    };

    /* Check user id */
    /* TODO do that not need refresh after log in */
    React.useEffect(() => {
        fetch("https://vaccine-backend.herokuapp.com/api/user", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.id !== undefined) {
                    setId(data.id);
                    props.storeUserId(data.id);
                }
            });
    }, []);

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
                            value={value}
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
                                disabled={id < 1}
                                value="/vaccines"
                            />
                            <Tab
                                className={classes.tab}
                                icon={<SettingsIcon />}
                                label={!mobile ? "Settings" : undefined}
                                disabled={id < 1}
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
                    <Button className={classes.button} color="inherit" onClick={handleLogin}>
                        {id > 0 ? "Log out" : "Log in"}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    userId: PropTypes.number
};

interface DispatchProps {
    storeUserId: typeof storeUserId;
}

interface MapStateToProps {
    userReducer: UserState;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        storeUserId: (payload: number) => dispatch(storeUserId(payload))
    };
};
/*function mapStateToProps(state: any):MapStateToProps {
    return {
        userReducer: state.userReducer
    }
};*/

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps
    )
)(Header);
