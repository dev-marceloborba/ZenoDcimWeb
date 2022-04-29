import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

const DeleteButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button {...props} variant="outlined" color="error">
      Apagar
    </Button>
  );
};

export default DeleteButton;
