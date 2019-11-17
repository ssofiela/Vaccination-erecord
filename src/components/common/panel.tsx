import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";

interface PanelProps {
    body: React.ReactNode;
    header: React.ReactNode;
    footer?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2, 4),
            overFlowX: "auto",
            minWidth: 800
        },
        header: {
            borderLeft: `7px solid ${theme.palette.primary.main}`
        }
    })
);

const Panel: React.FC<PanelProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Paper square className={classes.container}>
            <Box
                className={classes.header}
                display="flex"
                flexDirection="row"
                bgcolor={theme.palette.secondary.main}
                p={1.5}
            >
                {props.header}
            </Box>
            <Box p={5}>{props.body}</Box>
            {props.footer && (
                <Box display="flex" flexDirection="row" bgcolor="#f9f9f9" p={2}>
                    {props.footer}
                </Box>
            )}
        </Paper>
    );
};

export default Panel;
