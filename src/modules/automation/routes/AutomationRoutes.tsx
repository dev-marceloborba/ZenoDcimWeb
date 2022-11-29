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
    title: "Prédios",
  },
  {
    path: automationPaths.energyClimateTelecomFloor.fullPath,
    element: <EtcFloor />,
    title: "Andares",
    parameter: "floorId",
  },
  {
    path: automationPaths.cage.fullPath,
    element: <Cage />,
    title: "Equipamento",
    parameter: "id",
  },
  {
    path: automationPaths.rack.fullPath,
    element: <Rack />,
    title: "Rack",
  },
  {
    path: automationPaths.alarmHistory.fullPath,
    element: <AlarmHistory />,
    title: "Histórico de alarmes",
  },
  {
    path: automationPaths.alarmRealtime.fullPath,
    element: <AlarmRuntime />,
    title: "Alarmes em tempo real",
  },
  {
    path: automationPaths.measureHistory.fullPath,
    element: <MeasureHistory />,
    title: "Histórico de medidas",
  },
  {
    path: automationPaths.parameterDetails.fullPath,
    element: <ParameterHistoryPage />,
    title: "Histórico de parâmetros",
  },
  {
    path: automationPaths.fireSystem.fullPath,
    element: <FireSystem />,
    title: "Sistema anti-incêndio",
  },
  {
    path: automationPaths.accessControl.fullPath,
    element: <AccessControl />,
    title: "Controle de acesso",
  },
  {
    path: automationPaths.equipmentConnectivity.fullPath,
    element: <EquipmentConectivity />,
    title: "Conectividade de equipamentos",
  },
  {
    path: automationPaths.automationSettings.fullPath,
    element: <AutomationSettings />,
    title: "Configurações de automação",
  },
  {
    path: automationPaths.equipmentParameterDetails.fullPath,
    element: <EquipmentParametersPage />,
    title: "Parâmetros de equipamento",
  },
  {
    path: automationPaths.equipmentManagement.fullPath,
    element: <EquipmentAdmin />,
    title: "Equipamentos",
  },
  {
    path: automationPaths.equipmentForm.fullPath,
    element: <EquipmentForm />,
    title: "Formulário de equipamentos",
  },
  {
    path: automationPaths.equipmentParametersAssociation.fullPath,
    element: <EquipmentParametersAssociation />,
    title: "Associação de parâmetros",
  },
  {
    path: automationPaths.equipmentParameterForm.fullPath,
    element: <EquipmentParameterForm />,
    title: "Formulário de parâmetro de equipamento",
  },
  {
    path: automationPaths.parameterManagement.fullPath,
    element: <ParameterAdmin />,
    title: "Parâmetros",
  },
  {
    path: automationPaths.parameterForm.fullPath,
    element: <ParameterForm />,
    title: "Formulário de parâmetros",
  },
  {
    path: automationPaths.parameterForm.fullPath,
    element: <EquipmentParameterRulesForm />,
    title: "Formulário de regra de parâmetros",
  },
  {
    path: automationPaths.virtualParameterForm.fullPath,
    element: <VirtualParameterForm />,
    title: "Formulário de parâmetro virtual",
  },
  {
    path: automationPaths.parameterGroupManagement.fullPath,
    element: <ParameterGroupAdmin />,
    title: "Grupo de parâmetros",
  },
  {
    path: automationPaths.equipmentRules.fullPath,
    element: <EquipmentParameterRules />,
    title: "Regras de parâmetros",
  },
  {
    path: automationPaths.equipmentRulesForm.fullPath,
    element: <EquipmentParameterRulesForm />,
    title: "Formulário de regra de parâmetros",
  },
  {
    path: automationPaths.siteManagement.fullPath,
    element: <SiteAdmin />,
    title: "Site",
  },
  {
    path: automationPaths.siteForm.fullPath,
    element: <SiteForm />,
    title: "Formulário de site",
  },
  {
    path: automationPaths.buildingManagement.fullPath,
    element: <BuildingAdmin />,
    title: "Prédios",
  },
  {
    path: automationPaths.buildingForm.fullPath,
    element: <BuildingForm />,
    title: "Formulário de prédio",
  },
  {
    path: automationPaths.floorManagement.fullPath,
    element: <FloorAdmin />,
    title: "Andares",
  },
  {
    path: automationPaths.floorForm.fullPath,
    element: <FloorForm />,
    title: "Formulário de andar",
  },
  {
    path: automationPaths.roomManagement.fullPath,
    element: <RoomAdmin />,
    title: "Salas",
  },
  {
    path: automationPaths.roomForm.fullPath,
    element: <RoomForm />,
    title: "Formulário de sala",
  },
];

const AutomationRoutes = () => useRoutes(automationRoutes);

export default AutomationRoutes;
