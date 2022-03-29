import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import CssBaseLine from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { brandingDarkTheme } from "app/theme/brandingDarkTheme";
import { store } from "app/store";
import { Connector } from "mqtt-react-hooks";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Toast from "app/components/Toast";
import AutomationFiltersProvider from "features/automation/components/AutomationFiltersProvider";
import { ReactFlowProvider } from "react-flow-renderer";
import { brokerUrl, mqttConfig } from "app/config/env";
// import GlobalStyle from "app/styles/global-style";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={brandingDarkTheme}>
        <CssBaseLine />
        {/* <GlobalStyle /> */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Connector
            brokerUrl={brokerUrl}
            options={{ ...mqttConfig, protocol: "wss" }}
          >
            <Toast>
              <AutomationFiltersProvider>
                <ReactFlowProvider>
                  <App />
                </ReactFlowProvider>
              </AutomationFiltersProvider>
            </Toast>
          </Connector>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
