import { useState } from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

import { ParameterModel } from "modules/automation/models/automation-model";
import {
  useFindAllParametersQuery,
  useFindParameterByGroupMutation,
} from "modules/automation/services/parameter-service";
import {
  useCreateEquipmentParameterGroupMutation,
  useDeleteParameterGroupMutation,
  useFindAllParameterGroupsQuery,
} from "modules/automation/services/parameter-group-service";
import Loading from "modules/shared/components/Loading";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import { useModal } from "mui-modal-provider";
import CreateGroupModal from "./create-group-modal/CreateGroupModal";
import DeleteButton from "modules/shared/components/DeleteButton";
import Column from "modules/shared/components/Column";
import Button from "@mui/material/Button";

export default function ParameterGroupAdmin() {
  const [groupParameters, setGroupParameters] = useState<ParameterModel[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [checked, setChecked] = useState<ParameterModel[]>([]);
  const [findParametersByGroup] = useFindParameterByGroupMutation();
  const { data: groups, isLoading: isLoadingAllParameterGroups } =
    useFindAllParameterGroupsQuery();
  const { data: availableParameters, isLoading: isLoadingAllParameters } =
    useFindAllParametersQuery();
  const [createGroup] = useCreateEquipmentParameterGroupMutation();
  const [deleteGroup] = useDeleteParameterGroupMutation();
  const { showModal } = useModal();

  const handleChangeGroup = async (group: string) => {
    const result = await findParametersByGroup(group).unwrap();
    setGroupParameters(result);
    setSelectedGroup(group);
  };

  const handleNewGroupModal = () => {
    const modal = showModal(CreateGroupModal, {
      onConfirm: async (data) => {
        await createGroup({ name: data }).unwrap();
        modal.hide();
      },
      onCancel: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteGroup = async (groupId: string) => {
    await deleteGroup(groupId).unwrap();
  };

  const handleIncludeSelection = () => {
    console.log(checked);
  };

  const handleSelectItem = (value: ParameterModel) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
                      onClick={() => handleChangeGroup(group.name)}
                      selected={group.name === selectedGroup}
                    >
                      <ListItemText primary={group.name} />
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
                            <Checkbox
                              checked={checked.indexOf(ap) !== -1}
                              tabIndex={-1}
                            />
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

      <Loading open={isLoadingAllParameterGroups || isLoadingAllParameters} />
    </HeroContainer>
  );
}
