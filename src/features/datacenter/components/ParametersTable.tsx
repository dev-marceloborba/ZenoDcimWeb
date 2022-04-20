import React from "react";
import Table from "app/hooks/useTable";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import { useListAllParametersQuery } from "app/services/datacenter";
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
  const { data: parameters, isLoading } = useListAllParametersQuery();
  const handleSelectedParameter = (parameter: any) => {
    console.log(parameter);
  };
  return (
    <HeroContainer>
      <PageTitle>Parâmetros</PageTitle>
      <Table
        columns={columns}
        rows={parameters}
        onRowClick={handleSelectedParameter}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default ParametersTable;
