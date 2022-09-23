import AutomationRealtimeProvider from "modules/automation/data/providers/AutomationRealtimeProvider";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AlarmHistory from "../pages/alarm-history/AlarmHistory";
import AlarmRealtime from "../pages/alarm-realtime/AlarmRuntime";
import AlarmStatisticPage from "../pages/alarm-statistics-page/AlarmStatisticsPage";
import {
  AlarmHistoryPath,
  AlarmRealtimePath,
  AlarmStatisticsPath,
} from "./paths";

const AlarmsRoutes: React.FC = () => {
  return (
    <AutomationRealtimeProvider>
      <Routes>
        <Route path={AlarmHistoryPath} element={<AlarmHistory />} />
        <Route path={AlarmRealtimePath} element={<AlarmRealtime />} />
        <Route path={AlarmStatisticsPath} element={<AlarmStatisticPage />} />
      </Routes>
    </AutomationRealtimeProvider>
  );
};

export default AlarmsRoutes;
