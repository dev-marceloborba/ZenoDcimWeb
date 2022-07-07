// MuiButton wrapper to handle link buttons or custom OnClick event actions.

import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type AccessButtonProps = {
  mode: "regularButton" | "link";
  label: string;
  to?: string;
  // MuiButton props
  sx?: SxProps<Theme>;
  startIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "outlined" | "contained" | "text" | undefined;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  fullWidth?: boolean;
};

// type AccessButtonProps = {
//     mode: "regularButton" | "link";
//     label: string;
//     to?: string;
// } & ButtonProps;

const LinkButton = React.forwardRef<HTMLAnchorElement, AccessButtonProps>(
  (props, ref) => {
    const { to, onClick, ...rest } = props;
    return (
      <Button
        component={RouterLink}
        variant="text"
        to={to ?? ""}
        {...rest}
        ref={ref}
      >
        {props.label}
      </Button>
    );
  }
);

type RegularButtonProps = {
  label: string;
} & ButtonProps;

const RegularButton: React.FC<RegularButtonProps> = ({ ...props }) => {
  const { label } = props;
  return <Button {...props}>{label}</Button>;
};

export default function AccessButton(props: AccessButtonProps) {
  const { mode } = props;

  if (mode === "link") return <LinkButton {...props} />;
  else return <RegularButton {...props} />;
}
