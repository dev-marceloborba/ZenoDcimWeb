import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export type ModalProps = DialogProps;

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
