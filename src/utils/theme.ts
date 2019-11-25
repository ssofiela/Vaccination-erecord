import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0fa7bf",
            contrastText: "#fff"
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
            disabled: "#cecece",
            disabledBackground: "#f9f9f9"
        },
        text: {
            primary: "rgba(0, 0, 0, 0.54)"
        }
    },
    typography: {
        h6: {
            fontSize: "1.15rem"
        }
    },
    shape: {
        borderRadius: 0
    }
});
