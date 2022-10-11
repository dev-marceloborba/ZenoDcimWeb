import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import AlarmHistory from "../pages/alarm-history/AlarmHistory";
import AlarmRealtime from "../pages/alarm-realtime/AlarmRuntime";
import AlarmStatisticPage from "../pages/alarm-statistics-page/AlarmStatisticsPage";
import { alarmPaths } from "./paths";

export const alarmRoutes: RouteObject[] = [
  {
    path: alarmPaths.history.fullPath,
    element: <AlarmHistory />,
  },
  {
    path: alarmPaths.realtime.fullPath,
    element: <AlarmRealtime />,
  },
  {
    path: alarmPaths.statistics.fullPath,
    element: <AlarmStatisticPage />,
  },
];

const AlarmsRoutes: React.FC = () => useRoutes(alarmRoutes);

export default AlarmsRoutes;
