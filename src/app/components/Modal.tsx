import React from "react";
import Box from "@mui/material/Box";
import MuiModal, { ModalProps as MuiModalProps } from "@mui/material/Modal";

export type ModalProps = MuiModalProps;

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <MuiModal {...props}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};

const style = {
  position: "absolute",
  width: 400,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 5,
  p: 4,
};

export default Modal;
