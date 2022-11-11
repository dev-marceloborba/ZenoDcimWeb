import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import FireSystem from "modules/automation/pages/fire-system/FireSystem";
import AccessControl from "modules/automation/pages/access-control/AccessControl";
import EquipmentConectivity from "modules/automation/pages/equipment-connectivity/EquipmentConectivity";
import EquipmentAdmin from "modules/automation/pages/equipment-admin/EquipmentAdmin";
import { automationPaths } from "./paths";
import EtcFloor from "../pages/energy-clim-telecom/EtcvFloor";
import Cage from "../pages/cage/Cage";
import Rack from "../pages/rack/Rack";
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
    path: automationPaths.energyClimateTelecomFloor.fullPath,
    element: <EtcFloor />,
  },
  {
    path: automationPaths.cage.fullPath,
    element: <Cage />,
  },
  {
    path: automationPaths.rack.fullPath,
    element: <Rack />,
  },
  {
    path: automationPaths.alarmHistory.fullPath,
    element: <AlarmHistory />,
  },
  {
    path: automationPaths.alarmRealtime.fullPath,
    element: <AlarmRuntime />,
  },
  {
    path: automationPaths.measureHistory.fullPath,
    element: <MeasureHistory />,
  },
  {
    path: automationPaths.parameterDetails.fullPath,
    element: <ParameterHistoryPage />,
  },
  {
    path: automationPaths.fireSystem.fullPath,
    element: <FireSystem />,
  },
  {
    path: automationPaths.accessControl.fullPath,
    element: <AccessControl />,
  },
  {
    path: automationPaths.equipmentConnectivity.fullPath,
    element: <EquipmentConectivity />,
  },
  {
    path: automationPaths.automationSettings.fullPath,
    element: <AutomationSettings />,
  },
  {
    path: automationPaths.equipmentParameterDetails.fullPath,
    element: <EquipmentParametersPage />,
  },
  {
    path: automationPaths.equipmentManagement.fullPath,
    element: <EquipmentAdmin />,
  },
  {
    path: automationPaths.equipmentForm.fullPath,
    element: <EquipmentForm />,
  },
  {
    path: automationPaths.equipmentParametersAssociation.fullPath,
    element: <EquipmentParametersAssociation />,
  },
  {
    path: automationPaths.equipmentParameterForm.fullPath,
    element: <EquipmentParameterForm />,
  },
  {
    path: automationPaths.parameterManagement.fullPath,
    element: <ParameterAdmin />,
  },
  {
    path: automationPaths.parameterForm.fullPath,
    element: <ParameterForm />,
  },
  {
    path: automationPaths.parameterForm.fullPath,
    element: <EquipmentParameterRulesForm />,
  },
  {
    path: automationPaths.virtualParameterForm.fullPath,
    element: <VirtualParameterForm />,
  },
  {
    path: automationPaths.parameterGroupManagement.fullPath,
    element: <ParameterGroupAdmin />,
  },
  {
    path: automationPaths.equipmentRules.fullPath,
    element: <EquipmentParameterRules />,
  },
  {
    path: automationPaths.equipmentRulesForm.fullPath,
    element: <EquipmentParameterRulesForm />,
  },
  {
    path: automationPaths.siteManagement.fullPath,
    element: <SiteAdmin />,
  },
  {
    path: automationPaths.siteForm.fullPath,
    element: <SiteForm />,
  },
  {
    path: automationPaths.buildingManagement.fullPath,
    element: <BuildingAdmin />,
  },
  {
    path: automationPaths.buildingForm.fullPath,
    element: <BuildingForm />,
  },
  {
    path: automationPaths.floorManagement.fullPath,
    element: <FloorAdmin />,
  },
  {
    path: automationPaths.floorForm.fullPath,
    element: <FloorForm />,
  },
  {
    path: automationPaths.roomManagement.fullPath,
    element: <RoomAdmin />,
  },
  {
    path: automationPaths.roomForm.fullPath,
    element: <RoomForm />,
  },
];

const AutomationRoutes = () => useRoutes(automationRoutes);

export default AutomationRoutes;
