import React from "react";
import { Routes, Route } from "react-router-dom";
import AlarmList from "../pages/alarm-list/AlarmList";

const AlarmsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AlarmList />} />
    </Routes>
  );
};

export default AlarmsRoutes;
