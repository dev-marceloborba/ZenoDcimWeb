import React from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import { useFindAllWorkOrdersQuery } from "modules/maintenance/services/maintenance.service";
import Loading from "modules/shared/components/Loading";
import { WorkEventsTableViewModel } from "modules/maintenance/models/work-order.model";
import useRouter from "modules/core/hooks/useRouter";
import {
  getMaintenanceTypeDescription,
  getOperationNatureDescription,
} from "modules/maintenance/utils/work-order.utils";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";

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
        rows={
          workOrders?.map((workOrder) => ({
            ...workOrder,
            operationNature: getOperationNatureDescription(workOrder.nature),
            maintenanceType: getMaintenanceTypeDescription(
              workOrder.maintenanceType
            ),
            initialDate: getTimeStampFormat(workOrder.initialDate),
            finalDate: getTimeStampFormat(workOrder.finalDate),
          })) ?? []
        }
        columns={columns}
        options={{
          onRowClick: (row) => handleOpenWorkOrderDetails(row),
          selectionMode: "hide",
        }}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

const columns: ColumnHeader[] = [
  {
    name: "title",
    label: "Título",
  },
  {
    name: "equipment.component",
    label: "Equipamento",
  },
  {
    name: "maintenanceType",
    label: "Tipo de manutenção",
  },
  {
    name: "operationNature",
    label: "Natureza da operação",
  },
  {
    name: "responsible",
    label: "Responsável",
  },
  {
    name: "initialDate",
    label: "Data de criação",
  },
  {
    name: "finalDate",
    label: "Data de finalização",
  },
];

export default Events;
