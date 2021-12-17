import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

type ToastContextProps = {
  open(message: string, autoHideDuration: number): void;
  close(): void;
  options: {
    message: string;
    autoHideDuration?: number;
  };
};

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast: React.FC = ({ children }) => {
  const [state, setState] = useState({
    open: false,
    message: "",
    autoHideDuration: 6000,
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prevState) => ({ ...prevState, open: false }));
  };

//   const handleOpen = (message: string, autoHideDuration: number) => {
//     setState((prevState) => ({ ...prevState, open: true, message, autoHideDuration }));
//   };

  const handleOpen = useMemo(() => (message: string, autoHideDuration: number) => {
    setState((prevState) => ({ ...prevState, open: true, message, autoHideDuration }));
  }, [setState] ) 

  return (
    <ToastContext.Provider
      value={{
        open: handleOpen,
        close: handleClose,
        options: {
          message: state.message,
          autoHideDuration: state.autoHideDuration,
        },
      }}
    >
      <React.Fragment>
        <Snackbar
          open={state.open}
          autoHideDuration={state.autoHideDuration}
          onClose={handleClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        >
          <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
            {state.message}
          </Alert>
        </Snackbar>
        {children}
      </React.Fragment>
    </ToastContext.Provider>
  );
};

export default Toast;

export const useToast = () => useContext(ToastContext);
