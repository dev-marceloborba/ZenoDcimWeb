import React from "react";
import Table from "app/hooks/useTable";
import {
  useDeleteBuildingMutation,
  useListBuildingsQuery,
} from "app/services/datacenter";
import { useToast } from "app/components/Toast";

const columns = [
  // {
  //   name: "id",
  //   label: "Id",
  //   align: "left",
  // },
  {
    name: "name",
    label: "Nome",
    align: "left",
  },
];

const BuildingTable: React.FC = () => {
  const { data: buildings, isLoading } = useListBuildingsQuery();
  const [deleteBuilding] = useDeleteBuildingMutation();
  const toast = useToast();

  const handleDeleteBuilding = async (row: any) => {
    try {
      await deleteBuilding(row.id).unwrap();
      toast.open(`Prédio ${row.name} excluído com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(`Erro ao excluir o prédio ${row.name}`, 2000, "error");
    }
  };

  return (
    <Table
      columns={columns}
      rows={buildings}
      showActions
      handleDelete={handleDeleteBuilding}
    />
  );
};

export default BuildingTable;
