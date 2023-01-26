import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import CssBaseLine from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { store } from "modules/core/store";
import { Connector } from "mqtt-react-hooks";
import { ReactFlowProvider } from "react-flow-renderer";
import { brokerUrl, mqttConfig, signalrUrl } from "app/config/env";
import ModalProvider from "mui-modal-provider";
import { ptBR } from "@mui/material/locale";
import AppRoutes from "modules/AppRoutes";
import { brandingDarkTheme } from "modules/utils/brandingDarkTheme";
import ToastProvider from "modules/shared/components/ToastProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ptBrLocale from "date-fns/locale/pt-BR";
import { createSignalRContext } from "react-signalr";
import NotificationProvider from "modules/shared/components/notification-provider/NotificationProvider";
import AutomationRealtimeProvider from "modules/automation/data/providers/AutomationRealtimeProvider";
import { LayoutProvider } from "app/hooks/useLayout";

export const SignalRContext = createSignalRContext();

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={{ ...brandingDarkTheme, ptBR }}>
        <CssBaseLine />
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ptBrLocale}
        >
          <ToastProvider>
            <ReactFlowProvider>
              <ModalProvider>
                <NotificationProvider>
                  <Connector
                    brokerUrl={brokerUrl}
                    options={{
                      ...mqttConfig,
                      protocol: "wss",
                    }}
                  >
                    <AutomationRealtimeProvider>
                      <SignalRContext.Provider
                        url={signalrUrl}
                        withCredentials={false}
                      >
                        <LayoutProvider>
                          <AppRoutes />
                        </LayoutProvider>
                      </SignalRContext.Provider>
                    </AutomationRealtimeProvider>
                  </Connector>
                </NotificationProvider>
              </ModalProvider>
            </ReactFlowProvider>
          </ToastProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
