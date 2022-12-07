import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";
import { BreadcrumbData } from "use-react-router-breadcrumbs";

const EquipmentResolver = ({ match }: BreadcrumbData) => {
  const { isLoading, data: equipments } = useFindAllEquipmentsQuery();

  if (isLoading) return null;

  if (equipments) {
    return (
      <span>
        {equipments.find((e) => e.id === match.params.equipmentId)?.component}
      </span>
    );
  }
};

export default EquipmentResolver;
