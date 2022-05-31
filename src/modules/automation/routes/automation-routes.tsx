import React from "react";
import { Routes, Route } from "react-router-dom";
import Etc from "modules/automation/pages/energy-clim-telecom/Etc";

const AutomationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="etc" element={<Etc />} />
    </Routes>
  );
};

export default AutomationRoutes;
