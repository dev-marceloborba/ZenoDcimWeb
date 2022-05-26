import React from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import { useFindAllBuildingsDeepQuery } from "app/services/datacenter";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import Loading from "app/components/Loading";

const DataCenterEquipmentsTable: React.FC = () => {
  const { data: equipments, isLoading } = useFindAllBuildingsDeepQuery();
  return (
    <HeroContainer>
      <PageTitle>Equipamentos do Data center</PageTitle>
      <DataTable
        title="Equipamentos"
        columns={columns}
        rows={equipments ?? []}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default DataCenterEquipmentsTable;

const columns: ColumnHeader[] = [
  {
    label: "Classe",
    name: "class",
  },
  {
    label: "Componente",
    name: "component",
  },
  {
    label: "Código do componente",
    name: "componentCode",
  },
  {
    label: "Descrição",
    name: "description",
  },
  {
    label: "Prédio",
    name: "building",
  },
  {
    label: "Andar",
    name: "floor",
  },
  {
    label: "Sala",
    name: "room",
  },
];
