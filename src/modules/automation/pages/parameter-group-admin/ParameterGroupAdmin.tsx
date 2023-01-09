import { useState, useCallback, useMemo } from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";

import {
  EquipmentParameterGroupModel,
  ParameterModel,
} from "modules/automation/models/automation-model";
import {
  useCreateParametersIntoGroupMutation,
  useFindAllParametersQuery,
  useFindParameterByGroupMutation,
} from "modules/automation/services/parameter-service";
import {
  useCreateEquipmentParameterGroupMutation,
  // useCreateParametersIntoGroupMutation,
  useDeleteParameterGroupMutation,
  useUpdateEquipmentParameterGroupMutation,
  useFindAllParameterGroupsQuery,
} from "modules/automation/services/parameter-group-service";
import Loading from "modules/shared/components/Loading";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import { useModal } from "mui-modal-provider";
import CreateGroupModal from "./create-group-modal/CreateGroupModal";
import DeleteButton from "modules/shared/components/DeleteButton";
import Column from "modules/shared/components/Column";
import Button from "@mui/material/Button";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";

export default function ParameterGroupAdmin() {
  const [groupParameters, setGroupParameters] = useState<ParameterModel[]>([]);
  const [selectedGroup, setSelectedGroup] =
    useState<EquipmentParameterGroupModel>({} as EquipmentParameterGroupModel);
  const [findParametersByGroup, { isLoading: isLoadingFindParameterByGroup }] =
    useFindParameterByGroupMutation();
  const { data: groups, isLoading: isLoadingAllParameterGroups } =
    useFindAllParameterGroupsQuery();
  const { data: availableParameters, isLoading: isLoadingAllParameters } =
    useFindAllParametersQuery();
  const [createGroup, { isLoading: isLoadingCreateGroup }] =
    useCreateEquipmentParameterGroupMutation();
  const [deleteGroup, { isLoading: isLoadingDeleteGroup }] =
    useDeleteParameterGroupMutation();
  const [
    createParametersIntoGroup,
    { isLoading: isLoadingCreateParametersIntoGroup },
  ] = useCreateParametersIntoGroupMutation();
  const [
    editEquipmentParameterGroup,
    { isLoading: isLoadingEditEquipmentParameterGroup },
  ] = useUpdateEquipmentParameterGroupMutation();
  const { showModal } = useModal();

  const [selectedParameters, setSelectedParameters] = useState<any>([]);

  const handleChangeGroup = useCallback(
    async (group: EquipmentParameterGroupModel) => {
      const result = await findParametersByGroup(group.name).unwrap();
      setGroupParameters(result);
      setSelectedGroup(group);
    },
    [findParametersByGroup]
  );

  const handleNewGroupModal = () => {
    const modal = showModal(CreateGroupModal, {
      onConfirm: async (value) => {
        modal.hide();
        await createGroup({ name: value, parametersId: [] }).unwrap();
      },
      onCancel: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteGroup = async (groupId: string) => {
    await deleteGroup(groupId).unwrap();
  };

  const handleIncludeSelection = useCallback(async () => {
    await createParametersIntoGroup({
      groupId: selectedGroup.id,
      parameters: selectedParameters,
    }).unwrap();
    const result = await findParametersByGroup(selectedGroup.name).unwrap();
    setGroupParameters(result);
  }, [
    createParametersIntoGroup,
    findParametersByGroup,
    selectedGroup.id,
    selectedGroup.name,
    selectedParameters,
  ]);

  const handleEditGroup = (data: EquipmentParameterGroupModel) => {
    const modal = showModal(CreateGroupModal, {
      onConfirm: async (value) => {
        await editEquipmentParameterGroup({ id: data.id, name: value }).unwrap;
        modal.hide();
      },
      onCancel: () => {
        modal.hide();
      },
      mode: "edit",
      previousValue: data.name,
    });
  };

  const handleDeleteParameter = useCallback(
    async (parameter: ParameterModel) => {
      const newGroupParameters = [...groupParameters];
      const index = newGroupParameters.indexOf(parameter);

      newGroupParameters.splice(index, 1);

      await createParametersIntoGroup({
        groupId: selectedGroup.id,
        parameters: newGroupParameters.map<any>((item) => ({
          id: item.id,
        })),
      }).unwrap();
      const result = await findParametersByGroup(selectedGroup.name).unwrap();
      setGroupParameters(result);
    },
    [
      createParametersIntoGroup,
      findParametersByGroup,
      groupParameters,
      selectedGroup.id,
      selectedGroup.name,
    ]
  );

  const handleSelectItems = useCallback((items: any) => {
    setSelectedParameters(items);
  }, []);

  const previousItems = useMemo(() => {
    return groupParameters.map((gp) => ({
      id: gp.id,
      name: gp.name,
      unit: gp.unit,
    }));
  }, [groupParameters]);

  return (
    <HeroContainer title="Grupo de parâmetros">
      <AccessButton
        mode="regularButton"
        label="Novo grupo"
        onClick={handleNewGroupModal}
      />
      <Grid container columnSpacing={2}>
        <Grid item md={4}>
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
                      selected={group.name === selectedGroup.name}
                    >
                      <ListItemText primary={group.name} />
                      <IconButton onClick={() => handleEditGroup(group)}>
                        <EditIcon />
                      </IconButton>
                      <DeleteButton
                        onDeleteConfirmation={() => handleDeleteGroup(group.id)}
                        deleteMessage={`Tem certeza que deseja apagar o grupo ${group.name}?`}
                        mode="icon"
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={8}>
          <Grid container columnSpacing={2}>
            <Grid item md={2}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Ações
                  </Typography>
                  <Column
                    sx={{
                      "& .MuiButton-root": {
                        my: 0.5,
                      },
                    }}
                  >
                    <Button onClick={handleIncludeSelection}>
                      Incluir seleção
                    </Button>
                    <Button>Apagar seleção</Button>
                  </Column>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <DataTable
                title="Parâmetros disponíveis"
                columns={columns}
                rows={
                  availableParameters?.map((ap) => ({
                    id: ap.id,
                    name: ap.name,
                    unit: ap.unit,
                  })) ?? []
                }
                options={{
                  onSelectedItems: handleSelectItems,
                  previousItems,
                  userPreferenceTable: "availableParameterTable",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          md={6}
          columnSpacing={1}
          rowSpacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <Card>
            <CardContent>
              <DataTable
                title="Parâmetros do grupo"
                columns={columns}
                rows={previousItems}
                options={{
                  showDelete: true,
                  onDeleteRow: handleDeleteParameter,
                  userPreferenceTable: "groupParameterTable",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Loading
        open={
          isLoadingAllParameterGroups ||
          isLoadingAllParameters ||
          isLoadingFindParameterByGroup ||
          isLoadingCreateGroup ||
          isLoadingDeleteGroup ||
          isLoadingCreateParametersIntoGroup ||
          isLoadingEditEquipmentParameterGroup
        }
      />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "unit",
    label: "Unidade",
  },
];
