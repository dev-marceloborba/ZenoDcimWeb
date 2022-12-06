import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link, { LinkProps } from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { appRoutes } from "modules/AppRoutes";
import { memo } from "react";
interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const Breadcrumbs: React.FC = () => {
  //@ts-ignore
  const allRoutes = appRoutes.map((route) => ({
    path: route.path,
    breadcrumb: route?.resolver ?? route.title,
  }));
  //@ts-ignore
  const breadcrumbs = useBreadcrumbs(allRoutes, { disableDefaults: true });

  // Não exibe breadcrumb na tela Pai
  if (breadcrumbs.length === 1) return null;

  return (
    <MuiBreadcrumbs>
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        const last = index === breadcrumbs.length - 1;

        return last ? (
          <Typography key={match.pathname} color="text.primary">
            {breadcrumb}
          </Typography>
        ) : (
          <LinkRouter
            key={match.pathname}
            underline="hover"
            color="inherit"
            to={match.pathname}
          >
            {breadcrumb}
          </LinkRouter>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default memo(Breadcrumbs);
