import React from "react";
import Table from "app/hooks/useTable";
import { useListAllEquipmentParametersQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";

const columns = [
  {
    name: "name",
    label: "Nome",
    align: "left",
  },
  {
    name: "unit",
    label: "Unidade",
    align: "right",
  },
  {
    name: "lowLimit",
    label: "Limite baixo",
    align: "right",
  },
  {
    name: "highLimit",
    label: "Limite alto",
    align: "right",
  },
  {
    name: "scale",
    label: "Escala",
    align: "right",
  },
];

const ParametersTable: React.FC = () => {
  const { data: parameters, isLoading } = useListAllEquipmentParametersQuery();
  const handleSelectedParameter = (parameter: any) => {
    console.log(parameter);
  };
  return (
    <div>
      <Table
        columns={columns}
        rows={parameters}
        onRowClick={handleSelectedParameter}
      />
      <Loading open={isLoading} />
    </div>
  );
};

export default ParametersTable;
