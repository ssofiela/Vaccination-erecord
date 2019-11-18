import React from "react";
import PropTypes from "prop-types";
import { withRouter, RouteComponentProps } from "react-router";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

interface HeaderProps {
    userId?: number;
}

type Props = HeaderProps & RouteComponentProps;

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
        tabContainer: {
            flexGrow: 1
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
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            }).then(response => {
                console.log("header log out", response)
            })
        }
    };
    /* Check user id */
    React.useEffect(() => {
        fetch("https://vaccine-backend.herokuapp.com/api/user", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then(data => {
                if (data.id !== undefined) {
                    setId(data.id);
                }
                console.log("useEffect id", data, data.id)
            });
    }, []);


    return (
        <div className={classes.root}>
            <AppBar elevation={0} position="fixed" color="inherit" className={classes.appBar}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="primary">
                        Vaccination eRecord
                    </Typography>
                    <div className={classes.tabContainer}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            centered
                            aria-label="tabs"
                        >
                            <Tab label="Home" value="/" />
                            <Tab label="My vaccines" disabled={id < 1} value="/vaccines" />
                            <Tab label="Settings" disabled={id < 1} value="/settings" />
                            <Tab label="FAQ" disabled={id < 1} value="/frequently-asked-questions" />
                        </Tabs>
                    </div>
                    <Button color="inherit" onClick={handleLogin}>{id > 0 ? "Log out" : "Log in"}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    userId: PropTypes.number
};

export default withRouter(Header);
