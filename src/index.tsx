import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import CssBaseLine from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { store } from "modules/core/store";
import { Connector } from "mqtt-react-hooks";
import { ReactFlowProvider } from "react-flow-renderer";
import { brokerUrl, mqttConfig } from "app/config/env";
// import ModalProvider from "app/hooks/useModal";
import ModalProvider from "mui-modal-provider";
import { ptBR } from "@mui/material/locale";
import AppRoutes from "modules/AppRoutes";
import { brandingDarkTheme } from "modules/utils/brandingDarkTheme";
import ToastProvider from "modules/shared/components/ToastProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ptBrLocale from "date-fns/locale/pt-BR";
import { createSignalRContext } from "react-signalr";
import { userRoutes } from "modules/user/routes/UserRoutes";
import { maintenanceRoutes } from "modules/maintenance/routes/MaintenanceRoutes";
import { alarmRoutes } from "modules/alarms/routes/AlarmsRoutes";
import { automationRoutes } from "modules/automation/routes/AutomationRoutes";
import NotificationProvider from "modules/shared/components/notification-provider/NotificationProvider";
import AutomationRealtimeProvider from "modules/automation/data/providers/AutomationRealtimeProvider";

export const SignalRContext = createSignalRContext();

const appRoutes = [
  ...userRoutes,
  ...automationRoutes,
  ...alarmRoutes,
  ...maintenanceRoutes,
];

ReactDOM.render(
  <React.StrictMode>
    <SignalRContext.Provider
      url={"https://localhost:5001/notifications"}
      withCredentials={false}
    >
      <Provider store={store}>
        <ThemeProvider theme={{ ...brandingDarkTheme, ptBR }}>
          <CssBaseLine />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBrLocale}
          >
            <Connector
              brokerUrl={brokerUrl}
              options={{
                ...mqttConfig,
                protocol: "wss",
              }}
            >
              <ToastProvider>
                <ReactFlowProvider>
                  <ModalProvider>
                    <NotificationProvider>
                      <AutomationRealtimeProvider>
                        <AppRoutes />
                      </AutomationRealtimeProvider>
                    </NotificationProvider>
                  </ModalProvider>
                </ReactFlowProvider>
              </ToastProvider>
            </Connector>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </SignalRContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
