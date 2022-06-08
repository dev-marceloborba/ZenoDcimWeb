import React from "react";
import { Routes, Route } from "react-router-dom";
import Etc from "modules/automation/pages/energy-clim-telecom/Etc";
import FireSystem from "modules/automation/pages/fire-system/FireSystem";
import AccessControl from "modules/automation/pages/access-control/AccessControl";
import EquipmentConectivity from "modules/automation/pages/equipment-connectivity/EquipmentConectivity";
import AutomationRegister from "modules/automation/pages/automation-register/AutomationRegister";
import {
  AccessControlPath,
  AutomationRegisterPath,
  EnergyClimTelecomPath,
  EquipmentConnectivityPath,
  FireSystemPath,
} from "./paths";

const AutomationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={EnergyClimTelecomPath} element={<Etc />} />
      <Route path={FireSystemPath} element={<FireSystem />} />
      <Route path={AccessControlPath} element={<AccessControl />} />
      <Route
        path={EquipmentConnectivityPath}
        element={<EquipmentConectivity />}
      />
      <Route path={AutomationRegisterPath} element={<AutomationRegister />} />
    </Routes>
  );
};

export default AutomationRoutes;
