import React, { useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteButtonProps extends ButtonProps {
  onDeleteConfirmation: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDeleteConfirmation,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);
  return (
    <>
      <Button onClick={handleOpen} {...props} variant="outlined" color="error">
        Apagar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar ação</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja apagar o registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="contained" onClick={onDeleteConfirmation} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
