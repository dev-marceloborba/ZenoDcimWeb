import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Grid from "@mui/material/Grid";
import Form, { FormMode } from "modules/shared/components/Form";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import {
  EquipmentParameterGroupModel,
  EquipmentParameterGroupViewModel,
  ParameterModel,
} from "modules/automation/models/automation-model";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
// import CloseButton from "modules/shared/components/close-button/CloseButton";
import DeleteButton from "modules/shared/components/DeleteButton";

type GroupParameterFormModalProps = {
  onConfirm(formData: EquipmentParameterGroupViewModel): void;
  mode?: FormMode;
  data?: {
    model?: any;
    parameters?: ParameterModel[];
  };
} & ModalProps;

let selectedParameter: string | undefined;

const GroupParameterFormModal: React.FC<GroupParameterFormModalProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const [selectedParameters, setSelectedParameters] = useState<
    ParameterModel[]
  >([...(data?.model?.parameters ?? [])]);
  const methods = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  const onSubmit = (formData: EquipmentParameterGroupViewModel) =>
    onConfirm({
      name: formData.name,
      parametersId: selectedParameters.map((p) => p.id),
    });

  const handleAddParameter = () => {
    const parameter = data?.parameters?.find(
      (p) => p.id === selectedParameter
    )!;
    if (!selectedParameters.find((x) => x.id === parameter.id))
      setSelectedParameters((prevState) => [...prevState, parameter]);
  };

  const handleRemoveParameter = ({ id }: ParameterModel) =>
    setSelectedParameters((prevState) => prevState.filter((x) => x.id !== id));

  useEffect(() => {
    if (mode === "edit") {
      reset({ ...data?.model });
    }
  }, [data?.model, mode, reset]);

  return (
    <Modal
      {...props}
      PaperProps={{
        sx: {
          minWidth: 550,
        },
      }}
    >
      <Grid container columnSpacing={1}>
        <Grid item md={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <ControlledTextInput name="name" label="Grupo" sx={{ mt: 3 }} />
              <Autocomplete
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={
                  data?.parameters?.map((parameter) => ({
                    id: parameter.id,
                    label: parameter.name,
                  })) ?? []
                }
                onChange={(e, v) => (selectedParameter = v?.id)}
                renderInput={(params) => (
                  <TextField {...params} label="Parâmetros" />
                )}
                sx={{ mt: 1 }}
              />
              <Button
                fullWidth
                variant="contained"
                type="button"
                sx={{ mt: 1 }}
                onClick={handleAddParameter}
              >
                Adicionar
              </Button>
              <SubmitButton disabled={!isValid} sx={{ mt: 5 }} />
            </FormProvider>
          </Form>
        </Grid>
        <Grid item md={6}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography>Parâmetros adicionados</Typography>
            <Paper
              sx={{ padding: 1, width: 250, height: 200, overflow: "auto" }}
            >
              <List>
                {selectedParameters.map((parameter) => (
                  <ListItem key={parameter.id} disablePadding>
                    <ListItemText primary={parameter.name} />
                    <DeleteButton
                      mode="icon"
                      onDeleteConfirmation={() => {
                        handleRemoveParameter(parameter);
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default GroupParameterFormModal;

const schemaValidation = object().shape({
  name: string().required("Nome é obrigatório"),
});
