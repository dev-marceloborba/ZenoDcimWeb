import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link, { LinkProps } from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import useBreadcrumbs, { BreadcrumbData } from "use-react-router-breadcrumbs";
import { appRoutes } from "modules/AppRoutes";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const DynamicBreadcrumb = ({ location, match }: BreadcrumbData) => {
  console.log(match);
  const { state } = location;
  if (state?.description) {
    return <span>{state.description}</span>;
  } else {
    return null;
  }
};

const Breadcrumbs: React.FC = () => {
  const allRoutes = appRoutes.map((route) => ({
    path: route.path,
    // breadcrumb: route?.parameter ? DynamicBreadcrumb : route.title,
    breadcrumb: route.title,
  }));
  //@ts-ignore
  const breadcrumbs = useBreadcrumbs(allRoutes, { disableDefaults: true });

  // Não exibe breadcrumb na tela Pai
  if (breadcrumbs.length === 1) return null;

  // console.log(breadcrumbs);

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

export default Breadcrumbs;
