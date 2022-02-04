import React from "react";
import MuiAlert, { AlertProps as MuiAlertProps } from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type AlertProps = {
  open: boolean;
  message: string;
  handleClose(status: boolean): void;
} & Pick<MuiAlertProps, "severity" | "variant">;

const Alert: React.FC<AlertProps> = ({
  open,
  message,
  handleClose,
  ...props
}) => {
  return (
    <Collapse in={open}>
      <MuiAlert
        action={
          <IconButton size="small" onClick={() => handleClose(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        {...props}
      >
        {message}
      </MuiAlert>
    </Collapse>
  );
};
export default Alert;
