import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import { BreadcrumbData } from "use-react-router-breadcrumbs";

const BuildingResolver = ({ match }: BreadcrumbData) => {
  const { isLoading, data: buildings } = useFindAllBuildingsQuery();

  if (isLoading) return null;

  if (buildings) {
    return (
      <span>
        {
          buildings.find((building) => building.id === match.params.buildingId)
            ?.name
        }
      </span>
    );
  }
};

export default BuildingResolver;
