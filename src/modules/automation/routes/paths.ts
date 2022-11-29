export const automationPaths = {
  energyClimateTelecom: {
    fullpath: "etc",
  },
  energyClimateTelecomFloor: {
    fullPath: "etc/floor/:floorId",
    shortPath: "floor",
  },
  cage: {
    fullPath: "etc/floor/:floorId/cage/:roomId",
    shortPath: "cage",
  },
  equipmentParameterDetails: {
    fullPath:
      "etc/floor/:floorId/cage/:roomId/equipment-parameters-details/:equipmentId",
    shortPath: "equipment-parameters-details",
  },
  rack: {
    fullPath: "etc/floor/cage/rack",
    shortPath: "rack",
  },
  parameterDetails: {
    fullPath:
      "etc/floor/:floorId/cage/:roomId/equipment-parameters-details/:equipmentId/parameter-details",
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
