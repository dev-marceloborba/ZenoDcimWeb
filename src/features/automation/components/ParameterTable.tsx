import React from "react";
import DataTable, { Column } from "app/components/DataTable";
import { useListAllParametersQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";

const ParameterTable: React.FC = () => {
  const { data: parameters, isLoading } = useListAllParametersQuery();
  return (
    <>
      <DataTable
        columns={columns}
        rows={parameters ?? []}
        title="Parâmetros"
        options={{
          onRowClick: (row) => console.log(row),
        }}
      />
      <Loading open={isLoading} />
    </>
  );
};

export default ParameterTable;

const columns: Column[] = [
  {
    name: "name",
    label: "Parâmetro",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "lowLimit",
    label: "Limite inferior",
  },
  {
    name: "highLimit",
    label: "Limite superior",
  },
  {
    name: "scale",
    label: "Escala",
  },
];