import React from "react";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import { useListAllEquipmentParametersQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";

const ParametersTable: React.FC = () => {
  const { data: parameters, isLoading } = useListAllEquipmentParametersQuery();
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
