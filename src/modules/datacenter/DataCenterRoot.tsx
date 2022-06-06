import React from "react";
import { Provider } from "react-redux";
import { datacenterStore } from "modules/datacenter/stores/datacenter-store";
import DatacenterRoutes from "modules/datacenter/routes/DatacenterRoutes";

const DataCenterRoot: React.FC = () => {
  return (
    <Provider store={datacenterStore}>
      <DatacenterRoutes />
    </Provider>
  );
};

export default DataCenterRoot;
