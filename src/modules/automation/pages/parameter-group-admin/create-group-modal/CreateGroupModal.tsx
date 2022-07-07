import React, { useRef } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type CreateGroupModalProps = DialogProps & {
  onConfirm: (data: string) => void;
  onCancel: () => void;
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ ...props }) => {
  const { title, onConfirm, onCancel } = props;
  const inputRef = useRef<HTMLInputElement>();

  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Digite o nome do grupo a ser criado
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nome do grupo"
          type="text"
          fullWidth
          variant="standard"
          inputRef={inputRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm(inputRef.current?.value ?? "")}>
          Salvar
        </Button>
        <Button onClick={() => onCancel()}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupModal;
