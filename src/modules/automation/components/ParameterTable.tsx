import React from "react";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import Loading from "modules/shared/components/Loading";
import { useFindAllParametersQuery } from "../services/parameter-service";

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
    name: "scale",
    label: "Escala",
  },
];
