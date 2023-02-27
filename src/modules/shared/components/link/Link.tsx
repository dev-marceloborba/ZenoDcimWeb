import { forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import MuiLink, { LinkProps } from "@mui/material/Link";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <MuiLink component={LinkBehavior} {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
