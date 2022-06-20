import React, { useEffect } from "react";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import { useFindEquipmentByIdMutation } from "modules/automation/services/equipment-service";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import { useDeleteEquipmentParameterMutation } from "modules/automation/services/equipment-parameter-service";
import useRouter from "modules/core/hooks/useRouter";

const ParameterList: React.FC = () => {
  const [findEquipmentByid, { data: equipment }] =
    useFindEquipmentByIdMutation();
  const [deleteEquipmentParameter] = useDeleteEquipmentParameterMutation();
  const {
    navigate,
    state: { equipmentId },
  } = useRouter();

  const handleSelectedEquipmentParameter = (parameter: any) => {
    const selectedParameter = equipment?.equipmentParameters?.find(
      (x) => x.name === parameter.name
    );
    navigate(`/zeno/automation/management/equipment/parameter/form`, {
      state: {
        parameterId: selectedParameter?.id,
      },
    });
  };

  const handleDeleteEquipmentParameters = async (
    parameters: EquipmentParameterModel[]
  ) => {
    for (let i = 0; i < parameters.length; i++) {
      await deleteEquipmentParameter(parameters[i].id).unwrap();
    }
  };

  useEffect(() => {
    async function fetchEquipmentData() {
      if (equipmentId) {
        await findEquipmentByid(equipmentId).unwrap();
      }
    }
    fetchEquipmentData();
  }, [equipmentId, findEquipmentByid]);

  return (
    <DataTable
      title="Parâmetros"
      columns={columns}
      rows={equipment?.equipmentParameters ?? []}
      options={{
        onRowClick: handleSelectedEquipmentParameter,
        onDeleteSelection: handleDeleteEquipmentParameters,
      }}
    />
  );
};

export default ParameterList;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Parâmetro",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "dataSource",
    label: "Fonte de dados",
  },
  {
    name: "address",
    label: "Endereço",
  },
  {
    name: "lowLimit",
    label: "Limit min",
  },
  {
    name: "highLimit",
    label: "Limite max",
  },
  {
    name: "scale",
    label: "Escala",
  },
  {
    name: "rules",
    label: "Regras",
  },
];
