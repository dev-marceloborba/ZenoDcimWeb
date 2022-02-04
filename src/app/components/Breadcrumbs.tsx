import React from "react";
import Link, { LinkProps } from "@mui/material/Link";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  "/zeno": "Home",
  "/zeno/automation": "Automação",
  "/zeno/automation/etc": "Energia, clima e telecom",
  "/zeno/automation/etc/details": "Detalhes",
  "/zeno/automation/fire-system": "Incêndio",
  "/zeno/automation/fire-system/details": "Detalhes",
  "/zeno/automation/access-control": "Controle de acesso",
  "/zeno/automation/equipment-conectivity": "Conectividade de equipamentos",
  "/zeno/automation/management": "Cadastros de automação",
  "/zeno/automation/management/equipment": "Novo equipamento de energia"
};

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ml: 4}}>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
