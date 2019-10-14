import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0fa7bf"
        },
        secondary: {
            main: "#cfedf2"
        },
        error: {
            main: "#DE2525"
        },
        background: {
            default: "#fff"
        }
    },
    typography: {
        h6: {
            fontSize: "1.15rem"
        }
    }
});
