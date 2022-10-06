import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TabContextProvider } from "modules/shared/components/TabContext";
import TabPanel from "modules/shared/components/TabPanel";
import Row from "modules/shared/components/Row";
import CancelButton from "modules/shared/components/cancel-button/CancelButton";
import { UserPermissions } from "modules/user/models/group.model";

type UserGroupFormModalProps = {
  onConfirm?(
    formData: UserGroupFormViewModel,
    permissions: UserPermissions
  ): void;
  onCancel(): void;
  mode?: "new" | "edit";
  data?: {
    id: string;
    formData: UserGroupFormViewModel;
    permissions: UserPermissions;
  };
  onConfirmEdit?(
    id: string,
    formData: UserGroupFormViewModel,
    permissions: UserPermissions
  ): void;
} & DialogProps;

const UserGroupFormModal: React.FC<UserGroupFormModalProps> = ({
  onConfirm,
  onCancel,
  onConfirmEdit,
  mode = "new",
  data,
  ...props
}) => {
  const [tab, setTab] = useState(0);
  const [permissions, setPermissions] = useState<UserPermissions>({
    actions: {
      ackAlarms: false,
      editConnections: false,
    },
    registers: {
      alarms: false,
      datacenter: false,
      notifications: false,
      parameters: false,
      users: false,
    },
    views: {
      alarms: false,
      equipments: false,
      parameters: false,
    },
  });
  const methods = useForm<UserGroupFormViewModel>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = (form: any) => {
    if (onConfirm && mode === "new") {
      onConfirm(form, permissions);
    } else if (onConfirmEdit && mode === "edit") {
      onConfirmEdit(data!.id, form, permissions);
    }
  };

  const handleChangeActions = (property: any, value: boolean) => {
    setPermissions((prevState) => ({
      views: {
        ...prevState.views,
      },
      registers: {
        ...prevState.registers,
      },
      actions: {
        ...prevState.actions,
        [property]: value,
      },
    }));
  };

  const handleChangeRegisters = (property: any, value: boolean) => {
    setPermissions((prevState) => ({
      views: {
        ...prevState.views,
      },
      registers: {
        ...prevState.registers,
        [property]: value,
      },
      actions: {
        ...prevState.actions,
      },
    }));
  };

  const handleChangeViews = (property: any, value: boolean) => {
    setPermissions((prevState) => ({
      views: {
        ...prevState.views,
        [property]: value,
      },
      registers: {
        ...prevState.registers,
      },
      actions: {
        ...prevState.actions,
      },
    }));
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      setValue("name", data.formData.name);
      setValue("description", data.formData.description);
      setPermissions(data.permissions);
    }
  }, [data, mode, setValue]);

  return (
    <Dialog {...props}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <ControlledTextInput name="name" label="Grupo" sx={{ mt: 1 }} />
            <ControlledTextInput
              name="description"
              label="Descrição"
              sx={{ mt: 2 }}
            />
            <Typography sx={{ mt: 2 }}>Permissões</Typography>
            <Tabs value={tab} onChange={(_, value) => setTab(value)}>
              <Tab label="Ações" />
              <Tab label="Cadastros" />
              <Tab label="Visualizações" />
            </Tabs>
            <TabPanel index={0} value={tab}>
              <Card sx={{ minHeight: 250 }}>
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      label="Editar conexões"
                      control={
                        <Checkbox
                          checked={permissions.actions.ackAlarms}
                          onChange={(_, v) =>
                            handleChangeActions("ackAlarms", v)
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Reconhecer alarmes"
                      control={
                        <Checkbox
                          checked={permissions.actions.editConnections}
                          onChange={(_, v) =>
                            handleChangeActions("editConnections", v)
                          }
                        />
                      }
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel index={1} value={tab}>
              <Card sx={{ minHeight: 250 }}>
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      label="Usuários"
                      control={
                        <Checkbox
                          checked={permissions.registers.users}
                          onChange={(_, v) => handleChangeRegisters("users", v)}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Datacenter"
                      control={
                        <Checkbox
                          checked={permissions.registers.datacenter}
                          onChange={(_, v) =>
                            handleChangeRegisters("datacenter", v)
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={permissions.registers.alarms}
                          onChange={(_, v) =>
                            handleChangeRegisters("alarms", v)
                          }
                        />
                      }
                      label="Alarmes"
                    />
                    <FormControlLabel
                      label="Notificações"
                      control={
                        <Checkbox
                          checked={permissions.registers.notifications}
                          onChange={(_, v) =>
                            handleChangeRegisters("notifications", v)
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Parâmetros"
                      control={
                        <Checkbox
                          checked={permissions.registers.parameters}
                          onChange={(_, v) =>
                            handleChangeRegisters("parameters", v)
                          }
                        />
                      }
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel index={2} value={tab}>
              <Card sx={{ minHeight: 250 }}>
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      label="Alarmes"
                      control={
                        <Checkbox
                          checked={permissions.views.alarms}
                          onChange={(_, v) => handleChangeViews("alarms", v)}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Parâmetros"
                      control={
                        <Checkbox
                          checked={permissions.views.parameters}
                          onChange={(_, v) =>
                            handleChangeViews("parameters", v)
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Equipamentos"
                      control={
                        <Checkbox
                          checked={permissions.views.equipments}
                          onChange={(_, v) =>
                            handleChangeViews("equipments", v)
                          }
                        />
                      }
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </TabPanel>
            <Row
              sx={{ mt: 2, alignItems: "center", justifyContent: "flex-end" }}
            >
              <SubmitButton />
              <CancelButton sx={{ ml: 1 }} onClick={() => onCancel()} />
            </Row>
          </FormProvider>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserGroupFormModal;

const validationSchema: SchemaOf<UserGroupFormViewModel> = object().shape({
  name: string().required("Nome do grupo é obrigatório"),
  description: string().required("Descrição é obrigatória"),
});

type UserGroupFormViewModel = {
  name: string;
  description: string;
};
