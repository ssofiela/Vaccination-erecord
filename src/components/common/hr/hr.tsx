import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        hr: {
            width: "100%",
            borderBottom: `5px dotted ${theme.palette.secondary.main}`,
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(5)
        }
    })
);

const HR: React.FC = () => {
    const classes = useStyles();
    return <div className={classes.hr} />;
};

export default HR;
