import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link, { LinkProps } from "@mui/material/Link";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useBreadcrumbs, { BreadcrumbData } from "use-react-router-breadcrumbs";
import { appRoutes } from "modules/AppRoutes";
import { memo } from "react";
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

let currentRoutes: any[] = [];
let lastRoute = "";

const Breadcrumbs: React.FC = () => {
  console.log(lastRoute);

  //@ts-ignore
  const { pathname, state } = useLocation();
  const allRoutes = appRoutes.map((route) => ({
    path: route.path,
    // breadcrumb: route?.parameter ? DynamicBreadcrumb : route.title,
    breadcrumb: route.title,
  }));
  //@ts-ignore
  const breadcrumbs = useBreadcrumbs(allRoutes, { disableDefaults: true });

  if (pathname.length > lastRoute.length) {
    console.log("colocar");
    currentRoutes.push({
      pathname,
      title: state?.description ?? "",
    });
  } else {
    console.log("retirar");
    currentRoutes.pop();
  }

  lastRoute = pathname;

  console.log(lastRoute);

  console.log(currentRoutes);

  // console.log(state);
  // console.log(pathname);

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

export default memo(Breadcrumbs);
