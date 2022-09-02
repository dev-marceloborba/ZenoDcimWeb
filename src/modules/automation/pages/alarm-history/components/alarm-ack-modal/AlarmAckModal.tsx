import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type AlarmAckModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
} & DialogProps;

const AlarmAckModal: React.FC<AlarmAckModalProps> = ({ ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja reconhecer o alarme?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={props.onConfirm}>
          Confirmar
        </Button>
        <Button onClick={props.onCancel}>Sair</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmAckModal;
