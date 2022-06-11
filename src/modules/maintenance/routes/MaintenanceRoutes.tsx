import React from "react";
import { Route, Routes } from "react-router-dom";
import Events from "modules/maintenance/pages/events/Events";
import Register from "modules/maintenance/pages/register/Register";
import Schedule from "modules/maintenance/pages/schedule/Schedule";

const MaintenanceRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="schedule" element={<Schedule />} />
      <Route path="events" element={<Events />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default MaintenanceRoutes;
