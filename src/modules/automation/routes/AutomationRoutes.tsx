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
  CagePath,
  EnergyClimTelecomPath,
  EquipmentConnectivityPath,
  FireSystemPath,
  RackPath,
  RuleRegisterPath,
} from "./paths";
import Etcv2 from "../pages/energy-clim-telecom/Etcv2";
import Cage from "../pages/cage/Cage";
import Rack from "../pages/rack/Rack";
import RuleRegister from "../pages/rule-register/RuleRegister";

const AutomationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={EnergyClimTelecomPath} element={<Etcv2 />} />
      <Route path={FireSystemPath} element={<FireSystem />} />
      <Route path={AccessControlPath} element={<AccessControl />} />
      <Route
        path={EquipmentConnectivityPath}
        element={<EquipmentConectivity />}
      />
      <Route path={AutomationRegisterPath} element={<AutomationRegister />} />
      <Route path={CagePath} element={<Cage />} />
      <Route path={RackPath} element={<Rack />} />
      <Route path={RuleRegisterPath} element={<RuleRegister />} />
    </Routes>
  );
};

export default AutomationRoutes;
