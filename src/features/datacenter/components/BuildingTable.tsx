import React from "react";
import Table from "app/hooks/useTable";
import {
  useDeleteBuildingMutation,
  useListBuildingsQuery,
} from "app/services/datacenter";

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
  const [deleteBuilding] = useDeleteBuildingMutation();
  return (
    <Table
      columns={columns}
      rows={buildings}
      showActions
      handleDelete={async (row: any) => await deleteBuilding(row.id).unwrap()}
    />
  );
};

export default BuildingTable;
