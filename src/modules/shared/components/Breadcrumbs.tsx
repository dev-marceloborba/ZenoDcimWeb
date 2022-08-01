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
  "/zeno/automation/etc/floor": "Andares",
  "/zeno/automation/etc/floor/cage": "Salas",
  "/zeno/automation/etc/floor/cage/rack": "Rack",
  "/zeno/automation/etc/details": "Detalhes",
  "/zeno/automation/fire-system": "Incêndio",
  "/zeno/automation/fire-system/details": "Detalhes",
  "/zeno/automation/access-control": "Controle de acesso",
  "/zeno/automation/equipment-connectivity": "Conectividade de equipamentos",
  "/zeno/automation/management": "Cadastros de automação",
  "/zeno/automation/management/equipment": "Novo equipamento de energia",
  "/zeno/automation/management/building": "Entidades",
  "/zeno/automation/settings": "Configurações de automação",
  "/zeno/automation/settings/equipments": "Equipamentos",
  "/zeno/automation/settings/equipments/form": "Criar ou editar equipamento",
  "/zeno/automation/settings/equipments/equipment-parameters-association":
    "Associar parâmetros",
  "/zeno/automation/settings/parameters/form": "Criar ou editar parâmetro",
  "/zeno/automation/settings/parameters/groups": "Grupo de parâmetros",
  "/zeno/automation/settings/rooms": "Salas",
  "/zeno/automation/settings/floors": "Andares",
  "/zeno/automation/settings/buildings": "Prédios",
  "/zeno/automation/settings/sites": "Sites",
  "/zeno/automation/settings/sites/form": "Criar ou editar sites",
  "/zeno/automation/settings/parameters/virtual-parameter-form":
    "Criar ou editar parâmetros virtuais",
  "/zeno/automation/settings/equipments/rules": "Regras de disparo",
  "/zeno/automation/settings/equipments/rules/form":
    "Criar ou editar regras de disparo",
  "/zeno/automation/settings/parameters": "Parâmetros",
  "/zeno/settings": "Configurações",
  "/zeno/settings/new-user": "Novo usuário",
  "/zeno/settings/new-company": "Nova empresa",
  "/zeno/settings/user-help": "Ajuda",
  "/zeno/dashboard": "Dashboard",
  "/zeno/dashboard/energy": "Energia",
};

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {pathnames.map((_, index) => {
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
