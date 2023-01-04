import { RouteObject, useRoutes } from "react-router-dom";
import FireSystem from "modules/automation/pages/fire-system/FireSystem";
import AccessControl from "modules/automation/pages/access-control/AccessControl";
import EquipmentConectivity from "modules/automation/pages/equipment-connectivity/EquipmentConectivity";
import EquipmentAdmin from "modules/automation/pages/equipment-admin/EquipmentAdmin";
import { automationPaths } from "./paths";
import EtcFloor from "../pages/energy-clim-telecom/EtcFloorv2";
import Cage from "../pages/cage/Cage";
import Rack from "../pages/rack/Rack";
import AutomationSettings from "../pages/automation-settings/AutomationSettings";
import EquipmentForm from "../pages/equipment-admin/components/equipment-form/EquipmentForm";
import ParameterAdmin from "../pages/parameter-admin/ParameterAdmin";
import ParameterForm from "../pages/parameter-admin/components/parameter-form/ParameterForm";
import ParameterGroupAdmin from "../pages/parameter-group-admin/ParameterGroupAdmin";
import EquipmentParametersAssociation from "../pages/equipment-admin/components/equipment-parameters-association/EquipmentParametersAssociation";
import EquipmentParameterForm from "../pages/equipment-admin/components/equipment-parameter-form/EquipmentParameterForm";
import EtcBuilding from "../pages/energy-clim-telecom/EtcBuildingv2";
import VirtualParameterForm from "../pages/parameter-admin/components/virtual-parameter-form/VirtualParameterForm";
import EquipmentParameterRules from "../pages/equipment-admin/components/equipment-parameter-rules/EquipmentParameterRules";
import EquipmentParameterRulesForm from "../pages/equipment-admin/components/equipment-parameter-rules-form/EquipmentParameterRulesForm";
import EquipmentParametersPage from "../pages/parameter-admin/EquipmentParametersPagev2";
import ParameterHistoryPage from "../pages/parameter-history-page/ParameterHistoryPage";
import FloorResolver from "./resolvers/FloorResolver";
import RoomResolver from "./resolvers/RoomResolver";
import EquipmentResolver from "./resolvers/EquipmentResolver";
import EquipmentParameterResolver from "./resolvers/EquipmentParameterResolver";
import SiteResolver from "./resolvers/SiteResolver";
import EtcRoom from "../pages/energy-clim-telecom/EtcRoom";
import BuildingResolver from "./resolvers/BuildingResolver";
import EtcEquipment from "../pages/energy-clim-telecom/EtcEquipment";
import EquipmentDetailsPage from "../pages/equipment-details-page/EquipmentDetailsPage";

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
    path: automationPaths.equipmentParameters.fullPath,
    element: <EquipmentParametersPage />,
    title: "Parâmetros",
  },
  {
    path: automationPaths.cage.fullPath,
    element: <Cage />,
    title: "Equipamento",
    resolver: RoomResolver,
  },
  {
    path: automationPaths.rack.fullPath,
    element: <Rack />,
    title: "Rack",
  },
  {
    path: automationPaths.parameterHistory.fullPath,
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
    path: automationPaths.equipmentParameterDetails.fullPath,
    element: <EquipmentParametersPage />,
    title: "Parâmetros de equipamento",
    resolver: EquipmentResolver,
  },
  {
    path: automationPaths.equipmentManagement.fullPath,
    element: <EquipmentAdmin />,
    title: "Equipamentos",
  },
  //TODO: Deletar, formulários serão modais.
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
  //TODO: Deletar, formulários serão modais.
  {
    path: automationPaths.equipmentParameterForm.fullPath,
    element: <EquipmentParameterForm />,
    title: "Formulário de parâmetro de equipamento",
  },
  {
    path: automationPaths.parameterManagement.fullPath,
    // element: <ParameterAdmin />,
    element: <EquipmentParametersPage />,
    title: "Parâmetros",
  },
  //TODO: Deletar, formulários serão modais.
  {
    path: automationPaths.parameterForm.fullPath,
    element: <ParameterForm />,
    title: "Formulário de parâmetros",
  },
  //TODO: Deletar, formulários serão modais.
  {
    path: automationPaths.parameterForm.fullPath,
    element: <EquipmentParameterRulesForm />,
    title: "Formulário de regra de parâmetros",
  },
  //TODO: Deletar, formulários serão modais.
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
  //TODO: Deletar, formulários serão modais.
  {
    path: automationPaths.equipmentRulesForm.fullPath,
    element: <EquipmentParameterRulesForm />,
    title: "Formulário de regra de parâmetros",
  },
];

const AutomationRoutes = () => useRoutes(automationRoutes);

export default AutomationRoutes;
