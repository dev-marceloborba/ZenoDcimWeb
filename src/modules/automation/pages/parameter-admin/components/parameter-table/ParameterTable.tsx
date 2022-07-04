import React from "react";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import { useFindAllEquipmentParametersQuery } from "modules/automation/services/equipment-parameter-service";

const ParametersTable: React.FC = () => {
  const { data: parameters, isLoading } = useFindAllEquipmentParametersQuery();
  const handleSelectedParameter = (parameter: any) => {
    console.log(parameter);
  };
  return (
    <>
      <DataTable
        title="Parâmetros"
        columns={columns}
        rows={parameters ?? []}
        options={{
          onRowClick: handleSelectedParameter,
        }}
      />
      <Loading open={isLoading} />
    </>
  );
};

export default ParametersTable;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "lowLimit",
    label: "Limite baixo",
  },
  {
    name: "highLimit",
    label: "Limite alto",
  },
  {
    name: "scale",
    label: "Escala",
  },
];
