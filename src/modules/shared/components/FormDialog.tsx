import React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import Form from "modules/shared/components/Form";
import ControlledTextInput from "./ControlledTextInput";

type FormDialogProps<T> = {
  onSave: (value: T) => void;
  onCancel: () => void;
} & DialogProps;

// const FormDialog: React.FC<FormDialogProps> = ({ ...props }) => {
function FormDialog<T>(props: FormDialogProps<T>) {
  const { title, children } = props;

  // precisa validar formulário
  const handleSave = () => {
    console.log("salvando");
  };

  const handleCancel = () => {
    console.log("cancelando");
  };

  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Form>
          <ControlledTextInput name="name" label="Parâmetro" />
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Salvar</Button>
        <Button onClick={handleCancel}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
