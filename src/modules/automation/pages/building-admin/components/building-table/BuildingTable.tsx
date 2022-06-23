import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "modules/shared/components/ToastProvider";
import Loading from "modules/shared/components/Loading";
import Column from "modules/shared/components/Column";
import DataTable from "modules/shared/components/DataTable";
import {
  useDeleteBuildingMutation,
  useFindAllBuildingsQuery,
} from "modules/datacenter/services/building-service";

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
