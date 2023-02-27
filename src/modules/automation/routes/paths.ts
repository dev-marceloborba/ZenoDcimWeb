export const automationPaths = {
  energyClimateTelecom: {
    fullpath: "etc",
  },
  energyClimateTelecomFloor: {
    fullPath: "etc/:siteId",
    shortPath: "floor",
  },
  roomCards: {
    fullPath: "etc/:siteId/:buildingId",
  },
  equipmentCards: {
    fullPath: "etc/:siteId/:buildingId/:roomId",
  },
  equipmentDeails: {
    fullPath: "etc/:siteId/:buildingId/:roomId/:equipmentId",
  },
  equipmentParameters: {
    fullPath: "etc/:siteId/:buildingId/:roomId/:equipmentId/parameters",
  },
  cage: {
    fullPath: "etc/floor/:floorId/cage/:roomId",
    shortPath: "cage",
  },
  rack: {
    fullPath: "etc/floor/cage/rack",
    shortPath: "rack",
  },
  parameterHistory: {
    fullPath:
      "etc/:siteId/:buildingId/:roomId/:equipmentId/:equipmentParameterId/history",
    alternativePath:
      "settings/equipments/details/:equipmentId/:equipmentParameterId/history",
    pathFromSite:
      ":siteId/:buildingId/:roomId/:equipmentId/:equipmentParameterId/history",
    pathFromBuilding:
      "buildingId/:roomId/:equipmentId/:equipmentParameterId/history",
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
  equipmentDetails: {
    fullPath: "settings/equipments/details/:equipmentId",
    shortPath: "details",
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
  measureHistory: {
    fullPath: "measure-history",
  },
};
