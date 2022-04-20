import React, { createContext, ReactNode, useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

type ModalContextProps = {
  closeModal: () => void;
  openModal: (title: string, Component: ReactNode) => void;
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

const ModalProvider: React.FC = ({ children }) => {
  const [_open, _setOpen] = useState(false);
  const [_title, _setTitle] = useState("");
  const [_component, _setComponent] = useState<ReactNode>();

  const handleClose = () => _setOpen(false);

  const handleOpen = (title: string, Component: ReactNode) => {
    _setTitle(title);
    _setOpen(true);
    _setComponent(Component);
  };

  return (
    <ModalContext.Provider
      value={{ closeModal: handleClose, openModal: handleOpen }}
    >
      {children}
      <Dialog onClose={handleClose} open={_open}>
        <DialogTitle>{_title}</DialogTitle>
        {_component}
      </Dialog>
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => useContext(ModalContext);
