import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseButton from "../close-button/CloseButton";

export type ModalProps = DialogProps;

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const { onClose } = props;
  return (
    <Dialog {...props}>
      <DialogTitle>
        {props.title}
        <CloseButton
          onClick={() => onClose!({}, "escapeKeyDown")}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        />
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
