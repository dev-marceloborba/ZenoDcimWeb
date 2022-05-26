import React, { useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

interface DeleteButtonProps extends ButtonProps {
  onDeleteConfirmation: () => void;
  mode?: "button" | "icon";
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDeleteConfirmation,
  mode = "button",
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Tooltip title="Apagar">
        {mode === "button" ? (
          <Button
            onClick={handleOpen}
            {...props}
            variant="outlined"
            color="error"
          >
            Apagar
          </Button>
        ) : (
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        )}
      </Tooltip>
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
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              onDeleteConfirmation();
            }}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
