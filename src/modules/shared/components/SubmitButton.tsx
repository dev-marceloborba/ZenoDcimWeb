import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

type SubmitButtonProps = {
  label?: string;
} & ButtonProps;

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = "Salvar",
  ...props
}) => {
  return (
    <Button type="submit" variant="contained" {...props}>
      {label}
    </Button>
  );
};

export default SubmitButton;
