import React from "react";
import { Routes, Route, RouteObject } from "react-router-dom";
// import Etc from "modules/automation/pages/energy-clim-telecom/Etc";
import FireSystem from "modules/automation/pages/fire-system/FireSystem";
import AccessControl from "modules/automation/pages/access-control/AccessControl";
import EquipmentConectivity from "modules/automation/pages/equipment-connectivity/EquipmentConectivity";
import EquipmentAdmin from "modules/automation/pages/equipment-admin/EquipmentAdmin";
import {
  AccessControlPath,
  AutomationSettingsPath,
  BuildingFormPath,
  BuildingManagementPath,
  CagePath,
  EnergyClimTelecomPath,
  EnergyClimTelecomFloorPath,
  EquipmentConnectivityPath,
  EquipmentFormPath,
  EquipmentManagementPath,
  EquipmentParameterFormPath,
  EquipmentParametersAssociationPath,
  FireSystemPath,
  FloorFormPath,
  FloorManagementPath,
  ParameterFormPath,
  ParameterGroupManagementPath,
  ParameterManagementPath,
  RackPath,
  RoomFormPath,
  RoomManagementPath,
  SiteFormPath,
  SiteManagementPath,
  VirtualParameterFormPath,
  EquipmentRulesPath,
  EquipmentRulesFormPath,
  MeasureHistoryPath,
  ParameterDetailsPath,
  AlarmHistoryPath,
  AlarmRealtimePath,
  EquipmentParameterDetailsPath,
  automationPaths,
} from "./paths";
import EtcFloor from "../pages/energy-clim-telecom/EtcvFloor";
import Cage from "../pages/cage/Cage";
import Rack from "../pages/rack/Rack";
// import RuleRegister from "../pages/rule-register/RuleRegister";
// import EnergyEquipmentRegister from "../pages/energy-equipment-register/EnergyEquipmentRegister";
import AutomationSettings from "../pages/automation-settings/AutomationSettings";
import EquipmentForm from "../pages/equipment-admin/components/equipment-form/EquipmentForm";
import RoomAdmin from "../pages/room-admin/RoomAdmin";
import RoomForm from "../pages/room-admin/components/room-form/RoomForm";
import FloorAdmin from "../pages/floor-admin/FloorAdmin";
import FloorForm from "../pages/floor-admin/components/floor-form/FloorForm";
import BuildingAdmin from "../pages/building-admin/BuildingAdmin";
import BuildingForm from "../pages/building-admin/components/building-form/BuilldingForm";
import SiteAdmin from "../pages/site-admin/SiteAdmin";
import SiteForm from "../pages/site-admin/components/site-form/SiteForm";
import ParameterAdmin from "../pages/parameter-admin/ParameterAdmin";
import ParameterForm from "../pages/parameter-admin/components/parameter-form/ParameterForm";
import ParameterGroupAdmin from "../pages/parameter-group-admin/ParameterGroupAdmin";
import EquipmentParametersAssociation from "../pages/equipment-admin/components/equipment-parameters-association/EquipmentParametersAssociation";
import EquipmentParameterForm from "../pages/equipment-admin/components/equipment-parameter-form/EquipmentParameterForm";
import EtcBuilding from "../pages/energy-clim-telecom/EtcBuilding";
import VirtualParameterForm from "../pages/parameter-admin/components/virtual-parameter-form/VirtualParameterForm";
import EquipmentParameterRules from "../pages/equipment-admin/components/equipment-parameter-rules/EquipmentParameterRules";
import EquipmentParameterRulesForm from "../pages/equipment-admin/components/equipment-parameter-rules-form/EquipmentParameterRulesForm";
import MeasureHistory from "../pages/measure-history/MeasureHistory";
import AlarmHistory from "../pages/alarm-history/AlarmHistory";
import AlarmRuntime from "../pages/alarm-history/components/alarm-runtime/AlarmRuntime";
import EquipmentParametersPage from "../pages/equipment-parameters-page/EquipmentParametersPage";
import ParameterHistoryPage from "../pages/parameter-history-page/ParameterHistoryPage";

export const automationRoutes: RouteObject[] = [
  {
    path: automationPaths.energyClimateTelecom.fullpath,
    element: <EtcBuilding />,
  },
  {
    path: automationPaths.energyClimateTelecomFloorPath.fullPath,
    element: <EtcFloor />,
  },
];

const AutomationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={EnergyClimTelecomPath} element={<EtcBuilding />} />
      <Route path={EnergyClimTelecomFloorPath} element={<EtcFloor />} />
      <Route path={CagePath} element={<Cage />} />
      <Route path={RackPath} element={<Rack />} />
      <Route
        path={EquipmentParameterDetailsPath}
        element={<EquipmentParametersPage />}
      />
      <Route path={ParameterDetailsPath} element={<ParameterHistoryPage />} />
      <Route path={AlarmHistoryPath} element={<AlarmHistory />} />
      <Route path={AlarmRealtimePath} element={<AlarmRuntime />} />
      <Route path={MeasureHistoryPath} element={<MeasureHistory />} />

      <Route path={FireSystemPath} element={<FireSystem />} />
      <Route path={AccessControlPath} element={<AccessControl />} />
      <Route
        path={EquipmentConnectivityPath}
        element={<EquipmentConectivity />}
      />

      <Route path={AutomationSettingsPath} element={<AutomationSettings />} />
      {/* equipment */}
      <Route path={EquipmentManagementPath} element={<EquipmentAdmin />} />
      <Route path={EquipmentFormPath} element={<EquipmentForm />} />
      <Route
        path={EquipmentParametersAssociationPath}
        element={<EquipmentParametersAssociation />}
      />
      <Route
        path={EquipmentParameterFormPath}
        element={<EquipmentParameterForm />}
      />
      <Route path={EquipmentRulesPath} element={<EquipmentParameterRules />} />
      <Route
        path={EquipmentRulesFormPath}
        element={<EquipmentParameterRulesForm />}
      />
      {/* parameters */}
      <Route path={ParameterManagementPath} element={<ParameterAdmin />} />
      <Route path={ParameterFormPath} element={<ParameterForm />} />
      <Route
        path={VirtualParameterFormPath}
        element={<VirtualParameterForm />}
      />
      <Route
        path={ParameterGroupManagementPath}
        element={<ParameterGroupAdmin />}
      />
      {/* rooms */}
      <Route path={RoomManagementPath} element={<RoomAdmin />} />
      <Route path={RoomFormPath} element={<RoomForm />} />
      {/* floors */}
      <Route path={FloorManagementPath} element={<FloorAdmin />} />
      <Route path={FloorFormPath} element={<FloorForm />} />
      {/* buildings */}
      <Route path={BuildingManagementPath} element={<BuildingAdmin />} />
      <Route path={BuildingFormPath} element={<BuildingForm />} />
      {/* sites */}
      <Route path={SiteManagementPath} element={<SiteAdmin />} />
      <Route path={SiteFormPath} element={<SiteForm />} />
    </Routes>
  );
};

export default AutomationRoutes;
