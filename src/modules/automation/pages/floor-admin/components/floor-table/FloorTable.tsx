import React, { useCallback } from "react";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import Column from "modules/shared/components/Column";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import ButtonLink from "modules/shared/components/ButtonLink";
import {
  useCreateFloorMutation,
  useDeleteFloorMutation,
  useFindAllFloorsQuery,
  useFindFloorByIdMutation,
} from "modules/datacenter/services/floor-service";
import {
  FloorModel,
  FloorViewModel,
} from "modules/datacenter/models/datacenter-model";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { automationPaths } from "modules/automation/routes/paths";
import { useToast } from "modules/shared/components/ToastProvider";

const FloorTable: React.FC = () => {
  const { data: floors, isLoading } = useFindAllFloorsQuery();
  const [createFloor] = useCreateFloorMutation();
  const [findFloor] = useFindFloorByIdMutation();
  const [deleteFloor] = useDeleteFloorMutation();
  const toast = useToast();

  const handleDeleteSelection = useCallback(
    async (rows: FloorModel[]) => {
      for (let i = 0; i < rows.length; i++) {
        await deleteFloor(rows[i].id);
      }
      toast.open({ message: "Andar(es) excluído(s) com sucesso" });
    },
    [deleteFloor, toast]
  );

  const handleDuplicateItem = async (floor: FloorModel) => {
    const item = await findFloor(floor.id).unwrap();
    const duplicate: FloorViewModel = {
      ...item,
      name: floor.name + " - cópia",
    };

    try {
      await createFloor(duplicate).unwrap();
      toast.open({ message: "Andar duplicado" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao duplicar andar", severity: "error" });
    }
  };

  return (
    <Column>
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
          mb: 2,
          " & .MuiTextField-root": {
            maxWidth: "300px",
          },
        }}
      >
        <ButtonLink
          variant="contained"
          to={compositePathRoute([
            HomePath,
            AutomationPath,
            automationPaths.floorForm.fullPath,
          ])}
        >
          Criar andar
        </ButtonLink>
      </Row>
      <DataTable
        title="Andares"
        rows={
          floors?.map((floor) => ({
            id: floor.id,
            name: floor.name,
            building: floor.building?.name,
          })) ?? []
        }
        columns={columns}
        options={{
          onDeleteSelection: handleDeleteSelection,
          onCopyItem: handleDuplicateItem,
          userPreferenceTable: "floorTable",
        }}
      />
      <Loading open={isLoading} />
    </Column>
  );
};

export default FloorTable;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Andar",
  },
  {
    name: "building",
    label: "Prédio",
  },
];
