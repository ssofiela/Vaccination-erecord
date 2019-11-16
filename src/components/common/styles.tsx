import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#0fa7bf"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 2, 2),
        maxWidth: 100
    },
    header: {
        borderLeft: `7px solid ${theme.palette.primary.main}`
    },
    container: {
        margin: theme.spacing(2, 4),
        overFlowX: "auto"
    },
    mobileContainer: {
        margin: theme.spacing(2, 0),
        overFlowX: "auto",
        minWidth: 200
    },
    link: {
        display: "flex",
        fontWeight: "bold"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    textField: {
        marginLeft: theme.spacing(2),
        maxWidth: 300,
        minWidth: 130
    },
    textFieldWithoutLimits: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    sameLine: {
        marginLeft: theme.spacing(2),
        flexDirection: "row",
        display: "flex"
    },
    differentLine: {
        marginLeft: theme.spacing(2),
        flexDirection: "column"
    },
    margin: {
        margin: theme.spacing(3)
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    dropdown: {
        width: "100%",
        height: "45px"
    },
    menu: {
        width: 200
    },
    inputField: {
        display: "flex",
        flexWrap: "wrap"
    },
    errorMessage: {
        color: "red"
    }
}));


export default useStyles;