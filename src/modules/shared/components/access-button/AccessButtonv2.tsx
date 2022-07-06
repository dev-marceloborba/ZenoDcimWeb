// Button to open modals or links
import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type AccessButtonProps = {
  mode: "regularButton" | "link";
  label: string;
  to: string;
  sx?: SxProps<Theme>;
  startIcon?: React.ReactNode;
};

const LinkButton = React.forwardRef<HTMLAnchorElement, AccessButtonProps>(
  (props, ref) => (
    <Button component={RouterLink} variant="text" {...props} ref={ref}>
      {props.label}
    </Button>
  )
);

const RegularButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default function AccessButton(props: AccessButtonProps) {
  const { mode } = props;

  if (mode === "link") return <LinkButton {...props} />;
  if (mode === "regularButton") return <RegularButton {...props} />;
}
