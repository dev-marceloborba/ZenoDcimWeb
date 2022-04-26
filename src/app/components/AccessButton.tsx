import React from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { SxProps, Theme } from "@mui/material";

type AccessButtonProps = {
  label: string;
  to: string;
  sx?: SxProps<Theme>;
  startIcon?: React.ReactNode;
};

const AccessButton = React.forwardRef<HTMLAnchorElement, AccessButtonProps>(
  (props, ref) => (
    <Button component={RouterLink} variant="text" {...props} ref={ref}>
      {props.label}
    </Button>
  )
);

export default AccessButton;
