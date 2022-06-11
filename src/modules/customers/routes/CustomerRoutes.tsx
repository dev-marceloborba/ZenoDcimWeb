import React from "react";
import { Route, Routes } from "react-router-dom";
import Capacity from "modules/customers/pages/capacity/Capacity";
import Contracts from "modules/customers/pages/contracts/Contracts";
import EquipmentRegister from "modules/customers/pages/equipment-register/EquipmentRegister";
import EventsAndCharges from "modules/customers/pages/events-and-charges/EventsAndCharges";
import Schedule from "modules/customers/pages/schedule/Schedule";
import WorkOrders from "modules/customers/pages/work-orders/WorkOrders";

const CustomerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="contracts" element={<Contracts />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="service-order" element={<WorkOrders />} />
      <Route path="events-and-injuries" element={<EventsAndCharges />} />
      <Route path="capacity" element={<Capacity />} />
      <Route path="new-equipment" element={<EquipmentRegister />} />
    </Routes>
  );
};

export default CustomerRoutes;
