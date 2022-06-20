import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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
  EquipmentFormPath,
  FireSystemPath,
  RackPath,
  RuleRegisterPath,
} from "./paths";
import compositePathRoute from "modules/utils/compositePathRoute";
import Etcv2 from "../pages/energy-clim-telecom/Etcv2";
import Cage from "../pages/cage/Cage";
import Rack from "../pages/rack/Rack";
import RuleRegister from "../pages/rule-register/RuleRegister";
import EnergyEquipmentRegister from "../pages/energy-equipment-register/EnergyEquipmentRegister";

const AutomationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={EnergyClimTelecomPath} element={<Etcv2 />} />
      <Route
        path={compositePathRoute([EnergyClimTelecomPath, CagePath])}
        element={<Cage />}
      />
      <Route
        path={compositePathRoute([EnergyClimTelecomPath, CagePath, RackPath])}
        element={<Rack />}
      />

      <Route path={FireSystemPath} element={<FireSystem />} />
      <Route path={AccessControlPath} element={<AccessControl />} />
      <Route
        path={EquipmentConnectivityPath}
        element={<EquipmentConectivity />}
      />
      <Route path={AutomationRegisterPath} element={<AutomationRegister />} />
      <Route
        path={compositePathRoute([AutomationRegisterPath, EquipmentFormPath])}
        element={<EnergyEquipmentRegister />}
      />

      <Route path={RuleRegisterPath} element={<RuleRegister />} />
    </Routes>
  );
};

export default AutomationRoutes;
