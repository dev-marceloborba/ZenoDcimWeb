import React from "react";
import { Route, Routes } from "react-router-dom";
import AccessControl from "modules/dashboards/pages/acess-control/AccessControl";
import Climate from "modules/dashboards/pages/climate/Climate";
import Energy from "modules/dashboards/pages/energy/Energy";
import FireSystem from "modules/dashboards/pages/fire-system/FireSystem";

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="energy" element={<Energy />} />
      <Route path="fire-system" element={<FireSystem />} />
      <Route path="climate" element={<Climate />} />
      <Route path="access-control" element={<AccessControl />} />
    </Routes>
  );
};

export default DashboardRoutes;
