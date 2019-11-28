import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";

import { configureStore } from "./redux/store";
import { App } from "./components/app";
import { theme } from "./utils/theme";

const store = configureStore({ session: {} });
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById("root")
);
