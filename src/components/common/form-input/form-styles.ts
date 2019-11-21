import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2)
        },
        labelContainer: {
            marginBottom: theme.spacing(1)
        },
        tooltip: {
            color: "#00000054"
        },
        errorMessage: {
            color: theme.palette.error.main
        },
        required: {
            color: theme.palette.error.main
        }
    })
);