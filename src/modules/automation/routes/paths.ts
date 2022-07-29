export const EnergyClimTelecomPath = "etc";
export const EnergyClimTelecomFloorPath = EnergyClimTelecomPath + "/floor";
export const CagePath = EnergyClimTelecomFloorPath + "/cage";
export const RackPath = CagePath + "/rack";
export const FireSystemPath = "fire-system";
export const AccessControlPath = "access-control";
export const EquipmentConnectivityPath = "equipment-connectivity";
export const AutomationSettingsPath = "settings";
// equipments
export const EquipmentManagementPath = AutomationSettingsPath + "/equipments";
export const EquipmentFormPath = EquipmentManagementPath + "/form";
export const EquipmentParametersAssociationPath =
  EquipmentManagementPath + "/equipment-parameters-association";
export const EquipmentParameterFormPath =
  EquipmentParametersAssociationPath + "/form";
// parameters
export const ParameterManagementPath = AutomationSettingsPath + "/parameters";
export const ParameterFormPath = ParameterManagementPath + "/form";
export const VirtualParameterFormPath =
  ParameterManagementPath + "/virtual-parameter-form";
export const ParameterGroupManagementPath = ParameterManagementPath + "/groups";
// rooms
export const RoomManagementPath = AutomationSettingsPath + "/rooms";
export const RoomFormPath = RoomManagementPath + "/form";
// floors
export const FloorManagementPath = AutomationSettingsPath + "/floors";
export const FloorFormPath = FloorManagementPath + "/form";
// buildings
export const BuildingManagementPath = AutomationSettingsPath + "/buildings";
export const BuildingFormPath = BuildingManagementPath + "/form";
// sites
export const SiteManagementPath = AutomationSettingsPath + "/sites";
export const SiteFormPath = SiteManagementPath + "/form";

// delete
export const AutomationRegisterPath = "management";

export const RuleRegisterPath = "rule-register";
