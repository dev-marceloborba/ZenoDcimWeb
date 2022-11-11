// export const EnergyClimTelecomPath = "etc";
// export const EnergyClimTelecomFloorPath = EnergyClimTelecomPath + "/floor";
// export const CagePath = EnergyClimTelecomFloorPath + "/cage";
// export const RackPath = CagePath + "/rack";
// export const EquipmentParameterDetailsPath =
//   CagePath + "/equipment-parameters-details";
// export const ParameterDetailsPath = RackPath + "/parameter-details";
// export const FireSystemPath = "fire-system";
// export const AccessControlPath = "access-control";
// export const EquipmentConnectivityPath = "equipment-connectivity";
// export const AutomationSettingsPath = "settings";
// // measures history
// export const MeasureHistoryPath = "measure-history";
// // alarm history
// export const AlarmHistoryPath = "alarm-history";
// export const AlarmRealtimePath = "alarm-realtime";
// // equipments
// export const EquipmentManagementPath = AutomationSettingsPath + "/equipments";
// export const EquipmentFormPath = EquipmentManagementPath + "/form";
// export const EquipmentParametersAssociationPath =
//   EquipmentManagementPath + "/equipment-parameters-association";
// export const EquipmentParameterFormPath =
//   EquipmentParametersAssociationPath + "/form";
// export const EquipmentRulesPath = EquipmentManagementPath + "/rules";
// export const EquipmentRulesFormPath = EquipmentRulesPath + "/form";
// // parameters
// export const ParameterManagementPath = AutomationSettingsPath + "/parameters";
// export const ParameterFormPath = ParameterManagementPath + "/form";
// export const VirtualParameterFormPath =
//   ParameterManagementPath + "/virtual-parameter-form";
// export const ParameterGroupManagementPath = ParameterManagementPath + "/groups";
// // rooms
// export const RoomManagementPath = AutomationSettingsPath + "/rooms";
// export const RoomFormPath = RoomManagementPath + "/form";
// // floors
// export const FloorManagementPath = AutomationSettingsPath + "/floors";
// export const FloorFormPath = FloorManagementPath + "/form";
// // buildings
// export const BuildingManagementPath = AutomationSettingsPath + "/buildings";
// export const BuildingFormPath = BuildingManagementPath + "/form";
// // sites
// export const SiteManagementPath = AutomationSettingsPath + "/sites";
// export const SiteFormPath = SiteManagementPath + "/form";

// // delete
// export const AutomationRegisterPath = "management";

// export const RuleRegisterPath = "rule-register";

export const automationPaths = {
  energyClimateTelecom: {
    fullpath: "etc",
  },
  energyClimateTelecomFloor: {
    fullPath: "etc/floor",
    shortPath: "floor",
  },
  cage: {
    fullPath: "etc/floor/cage",
    shortPath: "cage",
  },
  equipmentParameterDetails: {
    fullPath: "etc/floor/cage/equipment-parameters-details",
    shortPath: "equipment-parameters-details",
  },
  rack: {
    fullPath: "etc/floor/cage/rack",
    shortPath: "rack",
  },
  parameterDetails: {
    fullPath: "etc/floor/cage/rack/parameter-details",
    shortPath: "parameter-details",
  },
  fireSystem: {
    fullPath: "fire-system",
  },
  accessControl: {
    fullPath: "access-control",
  },
  equipmentConnectivity: {
    fullPath: "equipment-connectivity",
  },
  automationSettings: {
    fullPath: "settings",
  },
  equipmentManagement: {
    fullPath: "settings/equipments",
    shortPath: "equipments",
  },
  equipmentForm: {
    fullPath: "settings/equipments/form",
    shortPath: "form",
  },
  equipmentParametersAssociation: {
    fullPath: "settings/equipments/equipment-parameters-association",
    shortPath: "equipment-parameters-association",
  },
  equipmentParameterForm: {
    fullPath: "settings/equipments/equipment-parameters-association/form",
    shortPath: "form",
  },
  equipmentRules: {
    fullPath: "settings/equipments/rules",
    shortPath: "rules",
  },
  equipmentRulesForm: {
    fullPath: "settings/equipments/rules/form",
    shortPath: "form",
  },
  parameterManagement: {
    fullPath: "settings/parameters",
    shortPath: "parameters",
  },
  parameterForm: {
    fullPath: "settings/parameters/form",
    shortPath: "form",
  },
  virtualParameterForm: {
    fullPath: "settings/parameters/virtual-parameter-form",
    shortPath: "virtual-parameter-form",
  },
  parameterGroupManagement: {
    fullPath: "settings/parameters/groups",
    shortPath: "groups",
  },
  roomManagement: {
    fullPath: "settings/rooms",
    shortPath: "rooms",
  },
  roomForm: {
    fullPath: "settings/rooms/form",
    shortPath: "form",
  },
  floorManagement: {
    fullPath: "settings/floors",
    shortPath: "floors",
  },
  floorForm: {
    fullPath: "settings/floors/form",
    shortPath: "form",
  },
  buildingManagement: {
    fullPath: "settings/buildings",
    shortPath: "buildings",
  },
  buildingForm: {
    fullPath: "settings/buildings/form",
    shortPath: "form",
  },
  siteManagement: {
    fullPath: "settings/sites",
    shortPath: "sites",
  },
  siteForm: {
    fullPath: "settings/sites/form",
    shortPath: "form",
  },
  measureHistory: {
    fullPath: "measure-history",
  },
  alarmHistory: {
    fullPath: "alarm-history",
  },
  alarmRealtime: {
    fullPath: "alarm-realtime",
  },
};
