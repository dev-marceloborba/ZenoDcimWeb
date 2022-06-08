import React from "react";
import { Routes, Route } from "react-router-dom";
import Etc from "modules/automation/pages/energy-clim-telecom/Etc";
import FireSystem from "modules/automation/pages/fire-system/FireSystem";
import AccessControl from "modules/automation/pages/access-control/AccessControl";
import EquipmentConectivity from "modules/automation/pages/equipment-connectivity/EquipmentConectivity";
import AutomationRegister from "modules/automation/pages/automation-register/AutomationRegister";

const AutomationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="etc" element={<Etc />} />
      <Route path="fire-system" element={<FireSystem />} />
      <Route path="access-control" element={<AccessControl />} />
      <Route path="equipment-conectivity" element={<EquipmentConectivity />} />
      <Route path="management" element={<AutomationRegister />} />
    </Routes>
  );
};

export default AutomationRoutes;
