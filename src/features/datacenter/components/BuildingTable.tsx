import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBuildingMutation,
  useFindAllBuildingsQuery,
} from "app/services/datacenter";
import { useToast } from "app/components/Toast";
import Loading from "app/components/Loading";
import Column from "app/components/Column";
import DataTable from "app/components/DataTable";

const BuildingTable: React.FC = () => {
  const { data: buildings, isLoading } = useFindAllBuildingsQuery();
  const [deleteBuilding] = useDeleteBuildingMutation();
  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteBuilding = async (row: any) => {
    try {
      await deleteBuilding(row.id).unwrap();
      toast.open(`Prédio ${row.name} excluído com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(`Erro ao excluir o prédio ${row.name}`, 2000, "error");
    }
  };

  return (
    <Column sx={{ mt: 2 }}>
      <DataTable
        columns={columns}
        rows={buildings ?? []}
        title="Prédios"
        options={{ onRowClick: (row) => console.log(row) }}
      />
      <Loading open={isLoading} />
    </Column>
  );
};

export default BuildingTable;

const columns = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "site",
    label: "Site",
  },
];
