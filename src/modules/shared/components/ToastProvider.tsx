import React, { createContext, useContext, useState } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

type ToastOpenOptions = {
  message: string;
  autoHideDuration?: number;
  severity?: AlertColor;
  position?: ToastPosition;
};

type ToastContextProps = {
  open(options: ToastOpenOptions): Promise<void>;
  close(): void;
};

type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

type ToastVariant = "filled" | "standard" | "outlined";

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ToastState = {
  open: boolean;
  message: string;
  autoHideDuration: number;
  variant: ToastVariant;
  severity: AlertColor;
  mode: ToastPosition;
};

const initialState: ToastState = {
  open: false,
  message: "",
  autoHideDuration: 6000,
  variant: "filled",
  severity: "success",
  mode: "bottom-right",
};

const ToastProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<ToastState>(initialState);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prevState) => ({ ...prevState, open: false }));
  };

  function handleOpen(options: ToastOpenOptions): Promise<void> {
    return new Promise((resolve) => {
      setState((prevState) => ({
        ...prevState,
        open: true,
        message: options.message,
        autoHideDuration:
          options.autoHideDuration ?? initialState.autoHideDuration,
        variant: "filled",
        severity: options.severity ?? initialState.severity,
        mode: options.position ?? initialState.mode,
      }));
      setTimeout(() => {
        resolve();
      }, options.autoHideDuration ?? 2000);
    });
  }

  function handleToastPosition(mode: ToastPosition): SnackbarOrigin {
    switch (mode) {
      case "bottom-right":
        return {
          vertical: "bottom",
          horizontal: "right",
        };
      case "bottom-left":
        return {
          vertical: "bottom",
          horizontal: "left",
        };
      case "top-right":
        return {
          vertical: "top",
          horizontal: "right",
        };
      case "top-left":
        return {
          vertical: "top",
          horizontal: "left",
        };
      default:
        return {
          vertical: "top",
          horizontal: "center",
        };
    }
  }

  return (
    <ToastContext.Provider
      value={{
        open: handleOpen,
        close: handleClose,
      }}
    >
      <React.Fragment>
        <Snackbar
          open={state.open}
          autoHideDuration={state.autoHideDuration}
          onClose={handleClose}
          anchorOrigin={handleToastPosition(state.mode)}
        >
          <Alert
            onClose={handleClose}
            sx={{ width: "100%" }}
            variant={state.variant}
            severity={state.severity}
          >
            {state.message}
          </Alert>
        </Snackbar>
        {children}
      </React.Fragment>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
