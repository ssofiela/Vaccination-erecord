import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0fa7bf",
            contrastText: "white"
        },
        secondary: {
            main: "#cfedf2"
        },
        error: {
            main: "#DE2525"
        },
        background: {
            default: "#fff"
        },
        action: {
            disabled: "#707070",
            disabledBackground: "#f9f9f9"
        },
    },
    typography: {
        h6: {
            fontSize: "1.15rem"
        }
    }
});
