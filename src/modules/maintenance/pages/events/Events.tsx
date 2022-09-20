import React from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import { useFindAllWorkOrdersQuery } from "modules/maintenance/services/maintenance.service";
import Loading from "modules/shared/components/Loading";
import { WorkEventsTableViewModel } from "modules/maintenance/models/work-order.model";
import useRouter from "modules/core/hooks/useRouter";

const Events: React.FC = () => {
  const { data: workOrders, isLoading } = useFindAllWorkOrdersQuery();
  const { navigate } = useRouter();

  const handleOpenWorkOrderDetails = (workOrder: WorkEventsTableViewModel) => {
    navigate("/zeno/maintenance/events/details", {
      state: {
        data: workOrder,
      },
    });
  };

  return (
    <HeroContainer title="Histórico de manutenção">
      <DataTable
        title="Ordens de serviço"
        rows={workOrders ?? []}
        columns={columns}
        options={{
          onRowClick: (row) => handleOpenWorkOrderDetails(row),
        }}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

const columns: ColumnHeader[] = [
  {
    name: "site",
    label: "Site",
  },
  {
    name: "building",
    label: "Prédio",
  },
  {
    name: "floor",
    label: "Andar",
  },
  {
    name: "room",
    label: "Sala",
  },
  {
    name: "equipment",
    label: "Equipamento",
  },
  {
    name: "initialDate",
    label: "Data inicial",
  },
  {
    name: "finalDate",
    label: "Data final",
  },
  // {
  //   name: "status",
  //   label: "Status",
  // },
];

export default Events;
