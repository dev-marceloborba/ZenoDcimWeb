import React from "react";
import { useToast } from "modules/shared/components/ToastProvider";
import Loading from "modules/shared/components/Loading";
import Column from "modules/shared/components/Column";
import DataTable from "modules/shared/components/datatable/DataTable";
import {
  useDeleteBuildingMutation,
  useFindAllBuildingsQuery,
} from "modules/datacenter/services/building-service";
import { BuildingModel } from "modules/datacenter/models/datacenter-model";

const BuildingTable: React.FC = () => {
  const { data: buildings, isLoading } = useFindAllBuildingsQuery();
  const [deleteBuilding] = useDeleteBuildingMutation();
  const toast = useToast();

  const handleDeleteSelection = async (rows: BuildingModel[]) => {
    try {
      for (let i = 0; i < rows.length; i++) {
        await deleteBuilding(rows[i].id).unwrap();
      }
      toast.open({ message: `Prédio(s) excluído(s) com sucesso` });
    } catch (error) {
      toast.open({ message: `Erro ao excluir`, severity: "error" });
    }
  };

  return (
    <Column sx={{ mt: 2 }}>
      <DataTable
        columns={columns}
        rows={
          buildings?.map((building) => ({
            id: building.id,
            name: building.name,
            site: building.site?.name,
          })) ?? []
        }
        title="Prédios"
        options={{
          onRowClick: (row) => console.log(row),
          onDeleteSelection: handleDeleteSelection,
        }}
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
