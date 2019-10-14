import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import {
    createStyles,
    makeStyles,
    styled,
    Theme
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Colorize from "@material-ui/icons/Colorize";

import { sidebarWidth } from "../../../utils/contants";
import { theme } from "../../../utils/theme";

interface SidebarProps {
    open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebar: {
            width: sidebarWidth,
            flexShrink: 0
        },
        sidebarPaper: {
            width: sidebarWidth
        },
        toolbar: theme.mixins.toolbar
    })
);

const StyledListItem = styled(ListItem)({
    "&.Mui-selected": {
        backgroundColor: theme.palette.secondary.main,
        borderLeft: `7px solid ${theme.palette.primary.main}`
    },
    "&.Mui-selected:hover": {
        backgroundColor: theme.palette.secondary.light,
        borderLeft: `7px solid ${theme.palette.primary.light}`
    }
});

const Sidebar: React.FC<SidebarProps> = props => {
    const classes = useStyles();
    // TODO proper handling of current route location
    const selected = true;
    return (
        <Drawer
            className={classes.sidebar}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.sidebarPaper
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <StyledListItem button key={"my_vaccines"} selected={selected}>
                    <ListItemIcon color="inherit">
                        <Colorize />
                    </ListItemIcon>
                    <ListItemText primary={"My vaccines"} />
                </StyledListItem>
            </List>
        </Drawer>
    );
};

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired
};

export default Sidebar;
