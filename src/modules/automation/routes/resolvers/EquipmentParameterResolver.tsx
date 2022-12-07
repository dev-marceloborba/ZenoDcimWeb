import { useFindAllEquipmentParametersQuery } from "modules/automation/services/equipment-parameter-service";
import { BreadcrumbData } from "use-react-router-breadcrumbs";

const EquipmentParameterResolver = ({ match }: BreadcrumbData) => {
  const { isLoading, data: equipmentParameters } =
    useFindAllEquipmentParametersQuery();

  if (isLoading) return null;

  if (equipmentParameters) {
    return (
      <span>
        {
          equipmentParameters.find(
            (ep) => ep.id === match.params.equipmentParameterId
          )?.name
        }
      </span>
    );
  }
};

export default EquipmentParameterResolver;
