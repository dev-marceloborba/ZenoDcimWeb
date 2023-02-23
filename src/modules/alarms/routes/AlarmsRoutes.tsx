import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import AlarmHistory from "../pages/alarm-history/AlarmHistory";
import AlarmRealtime from "../pages/alarm-realtime/AlarmRuntime";
import { alarmPaths } from "./paths";

export const alarmRoutes: RouteObject[] = [
  {
    path: alarmPaths.history.fullPath,
    element: <AlarmHistory />,
    title: "Histórico de alarmes",
  },
  {
    path: alarmPaths.realtime.fullPath,
    element: <AlarmRealtime />,
    title: "Alarmes em tempo real",
  },
];

const AlarmsRoutes: React.FC = () => useRoutes(alarmRoutes);

export default AlarmsRoutes;
