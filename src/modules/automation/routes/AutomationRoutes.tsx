import { RouteObject, useRoutes } from "react-router-dom";
import FireSystem from "modules/automation/pages/fire-system/FireSystem";
import AccessControl from "modules/automation/pages/access-control/AccessControl";
import EquipmentConectivity from "modules/automation/pages/equipment-connectivity/EquipmentConectivity";
import EquipmentAdmin from "modules/automation/pages/equipment-admin/EquipmentAdminv2";
import { automationPaths } from "./paths";
import EtcFloor from "../pages/energy-clim-telecom/EtcFloorv2";
import AutomationSettings from "../pages/automation-settings/AutomationSettings";
import EtcBuilding from "../pages/energy-clim-telecom/EtcBuildingv2";
import ParameterHistoryPage from "../pages/parameter-history-page/ParameterHistoryPage";
import RoomResolver from "./resolvers/RoomResolver";
import EquipmentResolver from "./resolvers/EquipmentResolver";
import EquipmentParameterResolver from "./resolvers/EquipmentParameterResolver";
import SiteResolver from "./resolvers/SiteResolver";
import EtcRoom from "../pages/energy-clim-telecom/EtcRoom";
import BuildingResolver from "./resolvers/BuildingResolver";
import EtcEquipment from "../pages/energy-clim-telecom/EtcEquipment";
import EquipmentDetailsPage from "../pages/equipment-details-page/EquipmentDetailsPage";
import MeasureHistory from "../pages/measure-history/MeasureHistory";

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
    resolver: SiteResolver,
  },
  {
    path: automationPaths.roomCards.fullPath,
    element: <EtcRoom />,
    title: "Salas",
    resolver: BuildingResolver,
  },
  {
    path: automationPaths.equipmentCards.fullPath,
    element: <EtcEquipment />,
    title: "Equipamentos",
    resolver: RoomResolver,
  },
  {
    path: automationPaths.equipmentDeails.fullPath,
    element: <EquipmentDetailsPage />,
    title: "Detalhes equipamento",
    resolver: EquipmentResolver,
  },
  {
    path: automationPaths.parameterHistory.fullPath,
    element: <ParameterHistoryPage />,
    title: "Histórico de parâmetros",
    resolver: EquipmentParameterResolver,
  },
  {
    path: automationPaths.parameterHistory.alternativePath,
    element: <ParameterHistoryPage />,
    title: "Histórico de parâmetros",
    resolver: EquipmentParameterResolver,
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
  // Deletar, está duplicado.
  {
    path: automationPaths.equipmentManagement.fullPath,
    element: <EquipmentAdmin />,
    title: "Equipamentos",
  },
  {
    path: automationPaths.equipmentDetails.fullPath,
    element: <EquipmentDetailsPage />,
    title: "Detalhes",
  },
  {
    path: automationPaths.measureHistory.fullPath,
    element: <MeasureHistory />,
    title: "Histórico de medições",
  },
];

const AutomationRoutes = () => useRoutes(automationRoutes);

export default AutomationRoutes;
