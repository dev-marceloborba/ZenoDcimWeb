import React, { useRef, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type CreateGroupModalProps = DialogProps & {
  onConfirm: (value: string, data: any) => void;
  onCancel: () => void;
  mode?: "edit" | "create";
  previousValue?: string;
  data: any;
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ ...props }) => {
  const {
    title,
    onConfirm,
    onCancel,
    mode = "create",
    previousValue,
    data,
  } = props;
  const inputRef = useRef<HTMLInputElement>();

  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Digite o nome do grupo a ser ${
            mode === "create" ? "criado" : "editado"
          }`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nome do grupo"
          type="text"
          fullWidth
          variant="standard"
          inputRef={inputRef}
          {...(mode === "edit" && {
            defaultValue: previousValue,
          })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm(inputRef.current?.value ?? "", data)}>
          Salvar
        </Button>
        <Button onClick={() => onCancel()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupModal;
