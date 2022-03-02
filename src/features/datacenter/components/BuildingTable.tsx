import React from "react";
import Table from "app/hooks/useTable";
import { useListBuildingsQuery } from "app/services/datacenter";

const columns = [
  {
    name: "id",
    label: "Id",
    align: "left",
  },
  {
    name: "name",
    label: "Nome",
    align: "right",
  },
];

const BuildingTable: React.FC = () => {
  const { data: buildings, isLoading } = useListBuildingsQuery();
  return <Table columns={columns} rows={buildings} showActions />;
};

export default BuildingTable;
