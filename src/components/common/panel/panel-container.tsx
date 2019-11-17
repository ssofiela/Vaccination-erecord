import React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2, 4),
            overFlowX: "auto",
            minWidth: 800
        }
    })
);

const Container: React.FC = (props) => {
    const classes = useStyles();
    return (
        <Paper square className={classes.container}>
            {props.children}
        </Paper>
    );
};

export default Container;
