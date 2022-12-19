import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import { BreadcrumbData } from "use-react-router-breadcrumbs";

const SiteResolver = ({ match }: BreadcrumbData) => {
  const { isLoading, data: sites } = useFindAllSitesQuery();

  if (isLoading) return null;

  if (sites) {
    return <span>{sites.find((f) => f.id === match.params.siteId)?.name}</span>;
  }
};

export default SiteResolver;
