import { useState, useEffect } from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
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
  useEditEquipmentParameterGroupMutation,
  useFindAllParameterGroupsQuery,
} from "modules/automation/services/parameter-group-service";
import Loading from "modules/shared/components/Loading";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import { useModal } from "mui-modal-provider";
import CreateGroupModal from "./create-group-modal/CreateGroupModal";
import DeleteButton from "modules/shared/components/DeleteButton";
import Column from "modules/shared/components/Column";
import Button from "@mui/material/Button";

type ParameterCheckedViewModel = ParameterModel & {
  checked: boolean;
};

export default function ParameterGroupAdmin() {
  const [groupParameters, setGroupParameters] = useState<ParameterModel[]>([]);
  const [selectedGroup, setSelectedGroup] =
    useState<EquipmentParameterGroupModel>({} as EquipmentParameterGroupModel);
  const [findParametersByGroup, { isLoading: isLoadingFindParameterByGroup }] =
    useFindParameterByGroupMutation();
  const { data: groups, isLoading: isLoadingAllParameterGroups } =
    useFindAllParameterGroupsQuery();
  const { data: _availableParameters, isLoading: isLoadingAllParameters } =
    useFindAllParametersQuery();
  const [availableParameters, setAvailableParameters] = useState<
    ParameterCheckedViewModel[]
  >([]);
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
  ] = useEditEquipmentParameterGroupMutation();
  const { showModal } = useModal();

  useEffect(() => {
    setAvailableParameters(
      _availableParameters?.map<ParameterCheckedViewModel>((ap) => ({
        ...ap,
        checked: false,
      })) ?? []
    );
  }, [_availableParameters]);

  const updateParametersChecked = (parameters: ParameterModel[]) => {
    const ap = [...availableParameters];
    ap.forEach((v) => {
      const p = parameters.find((r) => r.id === v.id);
      if (p) {
        v.checked = true;
      } else {
        v.checked = false;
      }
    });
    setAvailableParameters(ap);
  };

  const handleChangeGroup = async (group: EquipmentParameterGroupModel) => {
    const result = await findParametersByGroup(group.name).unwrap();
    setGroupParameters(result);
    setSelectedGroup(group);
    updateParametersChecked(result);
  };

  const handleNewGroupModal = () => {
    const modal = showModal(CreateGroupModal, {
      onConfirm: async (value) => {
        modal.hide();
        await createGroup({ name: value }).unwrap();
      },
      onCancel: () => {
        modal.hide();
      },
      // data: selectedGroup,
    });
  };

  const handleDeleteGroup = async (groupId: string) => {
    await deleteGroup(groupId).unwrap();
  };

  const handleIncludeSelection = async () => {
    await createParametersIntoGroup({
      groupId: selectedGroup.id,
      parameters: availableParameters
        .filter((x) => x.checked === true)
        .map<any>((item) => ({
          id: item.id,
        })),
    }).unwrap();
    const result = await findParametersByGroup(selectedGroup.name).unwrap();
    setGroupParameters(result);
  };

  const handleSelectItem = (value: ParameterCheckedViewModel) => {
    const newSelection = [...availableParameters];
    const parameter = newSelection.find((x) => x.id === value.id);
    if (parameter) parameter.checked = !parameter.checked;
    setAvailableParameters(newSelection);
  };

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

  const handleDeleteParameter = async (parameter: ParameterModel) => {
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
    updateParametersChecked(result);
  };

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
            <Grid item md={5}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Parâmetros do grupo
                  </Typography>
                  <List>
                    {groupParameters.length === 0 && (
                      <Typography>Não há parâmetros para o grupo</Typography>
                    )}
                    {groupParameters.map((gp, index) => {
                      return (
                        <ListItem key={index} role="listitem" button>
                          <ListItemIcon>
                            <Checkbox tabIndex={-1} />
                          </ListItemIcon>
                          <ListItemText primary={gp.name} />
                          <DeleteButton
                            onDeleteConfirmation={() =>
                              handleDeleteParameter(gp)
                            }
                            deleteMessage={`Tem certeza que deseja apagar o parâmetro ${gp.name}?`}
                            mode="icon"
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>

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

            <Grid item md={5}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Parâmetros disponíveis
                  </Typography>
                  <List>
                    {availableParameters?.map((ap, index) => {
                      return (
                        <ListItem
                          key={index}
                          role="listitem"
                          button
                          onClick={() => handleSelectItem(ap)}
                        >
                          <ListItemIcon>
                            <Checkbox checked={ap.checked} tabIndex={-1} />
                          </ListItemIcon>
                          <ListItemText primary={ap.name} />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item md={4}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Parâmetros do grupo
              </Typography>
              <List>
                {groupParameters.length === 0 && (
                  <Typography>Não há parâmetros para o grupo</Typography>
                )}
                {groupParameters.map((gp, index) => (
                  <ListItem key={index} role="listitem" button>
                    <ListItemIcon>
                      <Checkbox tabIndex={-1} />
                    </ListItemIcon>
                    <ListItemText primary={gp.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Parâmetros disponíveis
              </Typography>
              <List>
                {availableParameters?.map((ap, index) => (
                  <ListItem key={index} role="listitem" button>
                    <ListItemIcon>
                      <Checkbox tabIndex={-1} />
                    </ListItemIcon>
                    <ListItemText primary={ap.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid> */}
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
