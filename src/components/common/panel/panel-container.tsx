import React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2, 2),
            overflowX: "auto",
            width: "100%",
        }
    })
);

const Container: React.FC = (props) => {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
                <Paper square className={classes.container}>
                    {props.children}
                </Paper>
            </Box>
        </Grid>

    );
};

export default Container;
