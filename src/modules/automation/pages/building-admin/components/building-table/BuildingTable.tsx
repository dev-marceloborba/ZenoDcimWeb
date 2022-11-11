import { useToast } from "modules/shared/components/ToastProvider";
import Loading from "modules/shared/components/Loading";
import Column from "modules/shared/components/Column";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import {
  useCreateBuildingMutation,
  useDeleteBuildingMutation,
  useFindAllBuildingsQuery,
  useFindBuildingByIdMutation,
} from "modules/datacenter/services/building-service";
import {
  BuildingModel,
  BuildingViewModel,
} from "modules/datacenter/models/datacenter-model";

const BuildingTable: React.FC = () => {
  const { data: buildings, isLoading } = useFindAllBuildingsQuery();
  const [deleteBuilding] = useDeleteBuildingMutation();
  const [findBuilding] = useFindBuildingByIdMutation();
  const [createBuilding] = useCreateBuildingMutation();
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

  const handleDuplicateItem = async (building: BuildingModel) => {
    const item = await findBuilding(building.id).unwrap();
    const duplicate: BuildingViewModel = {
      ...item,
      name: building.name + " - cópia",
    };

    try {
      await createBuilding(duplicate).unwrap();
      toast.open({ message: "Site duplicado" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao duplicar prédio", severity: "error" });
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
          onCopyItem: handleDuplicateItem,
          userPreferenceTable: "buildingTable",
        }}
      />
      <Loading open={isLoading} />
    </Column>
  );
};

export default BuildingTable;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "site",
    label: "Site",
  },
];
