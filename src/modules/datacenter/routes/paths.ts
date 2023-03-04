export const datacenterPaths = {
  settings: {
    fullPath: "infastructure-settings",
  },
  infraSettings: {
    fullPath: "infastructure-settings/infastructure-settings",
    shortPath: "infastructure-settings",
  },
  racks: {
    fullPath: "infastructure-settings/racks",
    shortPath: "racks",
  },
  rackDetails: {
    fullPath: "infastructure-settings/racks/:rackId",
    shortPath: "details",
  },
  rackEquipments: {
    fullPath: "infastructure-settings/rack-equipments",
    shortPath: "rack-equipments",
  },
  ocupation: "occupation",
  buildingOccupation: "occupation/:siteId",
  roomOccupation: "occupation/:siteId/:buildingId",
  rackOccupation: "occupation/:siteId/:buildingId/:roomId",
};
