import React from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Table from "app/hooks/useTable";
import { useListBuildingsDeepQuery } from "app/services/datacenter";

const DataCenterEquipmentsTable: React.FC = () => {
  const columns = [
    {
      label: "Classe",
      name: "class",
      align: "left",
    },
    {
      label: "Componente",
      name: "component",
      align: "right",
    },
    {
      label: "Código do componente",
      name: "componentCode",
      align: "right",
    },
    {
      label: "Descrição",
      name: "description",
      align: "right",
    },
    {
      label: "Prédio",
      name: "building",
      align: "right",
    },
    {
      label: "Andar",
      name: "floor",
      align: "right",
    },
    {
      label: "Sala",
      name: "room",
      align: "right",
    },
  ];

  const { isError, isLoading, error, data } = useListBuildingsDeepQuery();
  return (
    <HeroContainer>
      <PageTitle>Equipamentos do Data center</PageTitle>
      <Table columns={columns} rows={data} />
    </HeroContainer>
  );
};

export default DataCenterEquipmentsTable;
