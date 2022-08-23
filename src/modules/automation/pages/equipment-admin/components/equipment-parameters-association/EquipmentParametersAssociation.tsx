import { useCallback, useEffect, useState } from "react";

import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
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

import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { EquipmentParameterFormPath } from "modules/automation/routes/paths";

type ParameterCheckedViewModel = ParameterModel & {
  checked: boolean;
};

export default function EquipmentParametersAssociation() {
  const [groupParameters, setGroupParameters] = useState<
    ParameterCheckedViewModel[]
  >([]);
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

  const handleChangeGroup = async (group: EquipmentParameterGroupModel) => {
    const result = await findParametersByGroup(group.name).unwrap();
    setGroupParameters(result.map((p) => ({ ...p, checked: false })));
    setSelectedGroup(group);
  };

  const handleSelectedParameters = (value: ParameterCheckedViewModel) => {
    const newSelection = [...groupParameters];
    const parameter = newSelection.find((x) => x.id === value.id);
    if (parameter) parameter.checked = !parameter.checked;
    setGroupParameters(newSelection);
  };

  const handleIncludeSelection = async () => {
    const selected = groupParameters.filter((x) => x.checked === true);
    await createMultipleEquipmentParameters({
      parameters: selected.map((p) => ({
        equipmentId: equipment.id,
        name: p.name,
        unit: p.unit,
        address: "",
        dataSource: "",
        scale: p.scale,
        highLimit: p.highLimit,
        lowLimit: p.lowLimit,
        expression: p.expression,
      })),
    }).unwrap();
    getParameters();
  };

  const handleDeleteParametersSelection = async (items: any[]) => {
    for (let i = 0; i < items.length; i++) {
      await deleteEquipmentParameters(items[i].id).unwrap();
    }
    getParameters();
  };

  const handleSelectedRow = (parameter: EquipmentParameterModel) => {
    navigate(
      compositePathRoute([
        HomePath,
        AutomationPath,
        EquipmentParameterFormPath,
      ]),
      {
        state: {
          data: parameter,
          mode: "edit",
        },
      }
    );
  };

  const getParameters = useCallback(async () => {
    await findEquipmentParametersByEquipmentId(equipment.id).unwrap();
  }, [equipment.id, findEquipmentParametersByEquipmentId]);

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
                    variant="contained"
                    onClick={() => handleIncludeSelection()}
                  >
                    Incluir seleção
                  </Button>
                )}
              </Row>
              {groupParameters?.map((gp, index) => {
                return (
                  <ListItem
                    key={index}
                    role="listitem"
                    button
                    onClick={() => handleSelectedParameters(gp)}
                  >
                    <ListItemIcon>
                      <Checkbox checked={gp.checked} tabIndex={-1} />
                    </ListItemIcon>
                    <ListItemText primary={gp.name} />
                  </ListItem>
                );
              })}
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
