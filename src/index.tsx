import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";

import { configureStore } from "./redux/store";
import { App } from "./components/app";
import { theme } from "./utils/theme";
import { checkLoggedIn } from "./utils/requests";
import { RootState } from "./redux/reducers";

const renderApp = (initialState: RootState): void => {
    const store = configureStore(initialState);
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>,
        document.getElementById("root")
    );
};

(async () => renderApp(await checkLoggedIn()))();
