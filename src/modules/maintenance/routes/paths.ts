export const maintenancePaths = {
  schedule: {
    fullPath: "schedule",
  },
  events: {
    fullPath: "events",
  },
  register: {
    fullPath: "register",
  },
  eventDetails: {
    fullPath: "events/details",
    shortPath: "details",
  },
  suppliers: {
    fullPath: "suppliers",
  },
  menu: {
    fullPath: "menu"
  },
  initWorkOrder: {
    fullPath: "menu/init-work-order",
    shortPath: "init-work-order"
  },
  maintenancePlans: {
    fullPath: "menu/maintenance-plans",
    shortPath: "maintenance-plans"
  },
  queryWorkOrders: {
    fullPath: "menu/query-work-orders",
    shortPath: "query-work-orders"
  },
  workOrderDetails: {
    fullPath: "menu/query-work-orders/:workOrderId",
    shortPath: ":workOrderId"
  },
  workOrderTimeline: {
    fullPath: "menu/query-work-orders/timeline/:workOrderId"
  }
};
