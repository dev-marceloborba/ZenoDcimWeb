import { useCallback, useEffect, useState } from "react";
import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import Loading from "modules/shared/components/Loading";
import {
  useCreateMultipleEquipmentParametersMutation,
  useDeleteEquipmentParameterMutation,
  useFindEquipmentParametersByEquipmentIdMutation,
} from "modules/automation/services/equipment-parameter-service";
import { useFindAllParameterGroupsQuery } from "modules/automation/services/parameter-group-service";
import { useFindParameterByGroupMutation } from "modules/automation/services/parameter-service";
import {
  EquipmentParameterGroupModel,
  EquipmentParameterModel,
  ParameterModel,
} from "modules/automation/models/automation-model";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { automationPaths } from "modules/automation/routes/paths";
import { useToast } from "modules/shared/components/ToastProvider";

export default function EquipmentParametersAssociation() {
  const [selection, setSelection] = useState<ParameterModel[]>([]);
  const [groupParameters, setGroupParameters] = useState<ParameterModel[]>([]);
  const [selectedGroup, setSelectedGroup] =
    useState<EquipmentParameterGroupModel | null>(null);
  const {
    navigate,
    state: { selectedEquipment: equipment },
  } = useRouter();
  const [
    findEquipmentParametersByEquipmentId,
    {
      data: parameters,
      isLoading: isLoadingFindEquipmentParametersByEquipment,
    },
  ] = useFindEquipmentParametersByEquipmentIdMutation();
  const { data: groups, isLoading: isLoadingAllParameterGroups } =
    useFindAllParameterGroupsQuery();
  const [findParametersByGroup, { isLoading: isLoadingFindParameterByGroup }] =
    useFindParameterByGroupMutation();
  const [createMultipleEquipmentParameters] =
    useCreateMultipleEquipmentParametersMutation();
  const [deleteEquipmentParameters] = useDeleteEquipmentParameterMutation();
  const toast = useToast();

  const getParameters = useCallback(async () => {
    await findEquipmentParametersByEquipmentId(equipment.id).unwrap();
  }, [equipment.id, findEquipmentParametersByEquipmentId]);

  const handleChangeGroup = useCallback(
    async (group: EquipmentParameterGroupModel) => {
      const result = await findParametersByGroup(group.name).unwrap();
      setGroupParameters(result);
      setSelectedGroup(group);
    },
    [findParametersByGroup]
  );

  const handleSelectedParameters = useCallback(
    (parameters: ParameterModel[]) => {
      setSelection(parameters);
    },
    []
  );

  const handleIncludeSelection = useCallback(async () => {
    const selected = [...selection];
    await createMultipleEquipmentParameters({
      parameters: selected.map((p) => ({
        equipmentId: equipment.id,
        name: p.name,
        unit: p.unit,
        address: "",
        dataSource: "",
        scale: p.scale,
        expression: p.expression,
      })),
    }).unwrap();
    setSelection([]);
    getParameters();
    toast.open({ message: "Parâmetros incluidos com sucesso" });
  }, [
    createMultipleEquipmentParameters,
    equipment.id,
    getParameters,
    selection,
    toast,
  ]);

  const handleDeleteParametersSelection = async (
    items: EquipmentParameterModel[]
  ) => {
    for (let i = 0; i < items.length; i++) {
      await deleteEquipmentParameters(items[i].id).unwrap();
    }
    getParameters();
    toast.open({ message: "Parâmetros excluídos com sucesso" });
  };

  const handleSelectedRow = (parameter: EquipmentParameterModel) => {
    navigate(
      compositePathRoute([
        HomePath,
        AutomationPath,
        automationPaths.equipmentParameterForm.shortPath,
      ]),
      {
        state: {
          data: parameter,
          mode: "edit",
        },
      }
    );
  };

  useEffect(() => {
    getParameters();
  }, [equipment.id, findEquipmentParametersByEquipmentId, getParameters]);

  return (
    <HeroContainer title="Associar parâmetros a equipamento">
      <DataTable
        title={`Parâmetros de ${equipment.name}`}
        columns={columns}
        rows={parameters ?? []}
        options={{
          onDeleteSelection: handleDeleteParametersSelection,
          onRowClick: handleSelectedRow,
          userPreferenceTable: "equipmentParameterTable",
        }}
      />
      <Grid container columnSpacing={2}>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Grupo
              </Typography>
              <List>
                {groups?.map((group, index) => (
                  <ListItem key={index}>
                    <ListItemButton
                      onClick={() => handleChangeGroup(group)}
                      selected={group.name === selectedGroup?.name}
                    >
                      <ListItemText primary={group.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card>
            <CardContent>
              <Row sx={{ justifyContent: "space-between" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Parâmetros do grupo <strong>{selectedGroup?.name}</strong>
                </Typography>
                {groupParameters.length > 0 && (
                  <Button
                    disabled={selection.length === 0}
                    variant="contained"
                    onClick={() => handleIncludeSelection()}
                  >
                    Incluir seleção
                  </Button>
                )}
              </Row>
              <DataTable
                title=""
                columns={[
                  {
                    name: "name",
                    label: "Parâmetro",
                  },
                  {
                    name: "unit",
                    label: "Unidade",
                  },
                ]}
                rows={groupParameters.map((gp) => ({
                  id: gp.id,
                  name: gp.name,
                  unit: gp.unit,
                }))}
                options={{
                  onSelectedItems: handleSelectedParameters,
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Loading
        open={
          isLoadingFindEquipmentParametersByEquipment ||
          isLoadingAllParameterGroups ||
          isLoadingFindParameterByGroup
        }
      />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    label: "Parâmetro",
    name: "name",
  },
  {
    label: "Unidade",
    name: "unit",
  },
  {
    label: "Limite máximo",
    name: "highLimit",
  },
  {
    label: "Limite mínimo",
    name: "lowLimit",
  },
  {
    label: "Escala",
    name: "scale",
  },
  {
    label: "Fonte de dados",
    name: "dataSource",
  },
];
