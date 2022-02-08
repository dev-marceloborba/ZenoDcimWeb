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

const AccessButton: React.FC<AccessButtonProps> = ({ label, ...props }) => {
  return (
    <Button component={RouterLink} variant="text" {...props}>
      {label}
    </Button>
  );
};

export default AccessButton;
