import React, { useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Form from "modules/shared/components/Form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type CreateGroupModalProps = DialogProps & {
  onConfirm: (value: string) => void;
  onCancel: () => void;
  mode?: "edit" | "create";
  previousValue?: string;
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ ...props }) => {
  const { title, onConfirm, onCancel, mode = "create", previousValue } = props;

  const methods = useForm<GroupFormProps>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
    setValue,
  } = methods;

  const onSubmit: SubmitHandler<GroupFormProps> = (data) => {
    onConfirm(data.group);
  };

  useEffect(() => {
    if (mode === "edit") {
      setValue("group", previousValue ?? "");
    }
  }, [mode, previousValue, setValue]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        group: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Digite o nome do grupo a ser ${
            mode === "create" ? "criado" : "editado"
          }`}
        </DialogContentText>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ControlledTextInput
              name="group"
              label="Nome do grupo"
              variant="standard"
              autoFocus
              margin="dense"
            />
            <DialogActions>
              <SubmitButton disabled={!isValid} />
              <Button onClick={() => onCancel()}>Cancelar</Button>
            </DialogActions>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;

type GroupFormProps = {
  group: string;
};

const validationSchema: SchemaOf<GroupFormProps> = object().shape({
  group: string().required("Grupo é obrigatório"),
});
