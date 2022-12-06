import { useFindAllFloorsQuery } from "modules/datacenter/services/floor-service";
import { BreadcrumbData } from "use-react-router-breadcrumbs";

const FloorResolver = ({ match }: BreadcrumbData) => {
  const { isLoading, data: floors } = useFindAllFloorsQuery();

  if (isLoading) return null;

  if (floors) {
    return (
      <span>{floors.find((f) => f.id === match.params.floorId)?.name}</span>
    );
  }
};

export default FloorResolver;
