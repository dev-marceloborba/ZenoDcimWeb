import React, { createContext, useContext, useState, useMemo } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

type ToastContextProps = {
  open(
    message: string,
    autoHideDuration: number,
    variant: any,
    severity: any
  ): void;
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

type ToastProps = Pick<AlertProps, "variant" | "severity"> & {
  mode?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
};

const Toast: React.FC<ToastProps> = ({ children, ...props }) => {
  const [state, setState] = useState({
    open: false,
    message: "",
    autoHideDuration: 6000,
    variant: props.variant,
    severity: props.severity,
    mode: "bottom-right" as Pick<ToastProps, "mode">,
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

  const handleOpen = useMemo(
    () =>
      (
        message: string,
        autoHideDuration: number,
        variant: typeof props.variant = "filled",
        severity: typeof props.severity = "error"
      ) => {
        setState((prevState) => ({
          ...prevState,
          open: true,
          message,
          autoHideDuration,
          variant,
          severity,
        }));
      },
    [props]
  );

  function handleToastPosition(mode: Pick<ToastProps, "mode">): SnackbarOrigin {
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

export default Toast;

export const useToast = () => useContext(ToastContext);
