import React from "react";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import { useFindAllParametersQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";

const ParameterTable: React.FC = () => {
  const { data: parameters, isLoading } = useFindAllParametersQuery();
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
