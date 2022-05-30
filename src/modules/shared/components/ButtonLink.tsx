import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

type PickedButtonProps = Pick<ButtonProps, 'sx' | 'variant'>
type PickedRouterLinkProps = Pick<RouterLinkProps, 'to'>

type ButtonLinkProps = PickedButtonProps & PickedRouterLinkProps

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, ...props }) => {
  return (
    <Button component={RouterLink} {...props}>
      {children}
    </Button>
  );
};

export default ButtonLink;
