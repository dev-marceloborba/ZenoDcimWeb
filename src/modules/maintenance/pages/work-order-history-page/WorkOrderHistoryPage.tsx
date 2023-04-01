import {
  useCreateWorkOrderMutation,
  useFindAllWorkOrdersQuery,
} from "modules/maintenance/services/maintenance.service";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import WorkOrderStatus from "modules/maintenance/components/work-order-status/WorkOrderStatus";
import { getMaintenanceType } from "modules/maintenance/utils/work-order.utils";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import useRouter from "modules/core/hooks/useRouter";
import {
  EWorkOrderStatus,
  WorkOrderModel,
} from "modules/maintenance/models/work-order.model";
import CustomTabs from "modules/shared/components/tabs/Tabs";
import WorkOrderTimelinePage from "../work-order-timeline-page/WorkOrderTimelinePage";
import { useModal } from "mui-modal-provider";
import WorkOrderFormModal from "modules/maintenance/modals/work-order-form-modal/WorkOrderFormModal";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import { useToast } from "modules/shared/components/ToastProvider";

function getStatusFromTabSelection(tab: number) {
  return tab === 0 ? 8 : tab - 1;
}

export default function WorkOrderHistoryPage() {
  const toast = useToast();
  const { showModal } = useModal();
  const { data: sites } = useFindAllSitesQuery();

  const [createDraft] = useCreateWorkOrderMutation();
  const [sendToAproval] = useCreateWorkOrderMutation();

  const handleOpenWorkOrderModal = () => {
    const modal = showModal(WorkOrderFormModal, {
      title: "Abrir ordem de serviço",
      data: {
        sites: sites ?? [],
      },
      onSaveDraft: async (formData) => {
        console.log(formData);
        modal.hide();
        try {
          await createDraft(formData).unwrap();
          toast.open({
            message: "Rascunho de ordem de serviço criaco com sucesso",
          });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar rascunho de ordem de serviço" });
        }
      },
      onSendToAproval: async (formData) => {
        console.log(formData);
        modal.hide();
        try {
          await sendToAproval(formData).unwrap();
          toast.open({ message: "Ordem de serviço enviada para aprovação" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao enviar ordem de serviço para aprovação",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        style: {
          width: 1500,
        },
      },
    });
  };
  return (
    <HeroContainer title="Ordens de serviço">
      <CustomTabs
        tabItems={[
          {
            title: "Acompanhamento",
            element: <WorkOrderListTab />,
            content: (
              <Button variant="contained" onClick={handleOpenWorkOrderModal}>
                Abrir ordem de serviço
              </Button>
            ),
          },
          {
            title: "Linha do tempo",
            element: <WorkOrderTimelinePage />,
          },
        ]}
      />
    </HeroContainer>
  );
}

function WorkOrderListTab() {
  const { navigate } = useRouter();
  const [tab, setTab] = useState(0);
  const { data: workOrders, isLoading } = useFindAllWorkOrdersQuery({
    status: getStatusFromTabSelection(tab),
  });

  const handleOpenWorkOrderDetails = ({
    id,
    status,
    ...rest
  }: WorkOrderModel) => {
    if (status === EWorkOrderStatus.DRAFT) {
      navigate("/zeno/maintenance/menu/init-work-order", {
        state: {
          id,
          status,
          ...rest,
        },
      });
    } else {
      navigate(id, {});
    }
  };

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        indicatorColor="secondary"
        textColor="inherit"
      >
        <Tab label="Todas" />
        <Tab label="Rascunho" />
        <Tab label="Em aprovação" />
        <Tab label="Aprovado" />
        <Tab label="Aguardando execução" />
        <Tab label="Em execução" />
        <Tab label="Concluída" />
        <Tab label="Cancelada" />
        <Tab label="Recusada" />
      </Tabs>
      <DataTable
        title="Ordens de serviço"
        columns={columns}
        rows={
          workOrders?.map((workOrder) => ({
            ...workOrder,
            maintenanceTypeDescription: getMaintenanceType(
              workOrder.maintenanceType
            ),
            initialDate: getTimeStampFormat(workOrder.initialDate),
            finalDate: getTimeStampFormat(workOrder.finalDate),
          })) ?? []
        }
        options={{
          onRowClick: handleOpenWorkOrderDetails,
          selectionMode: "hide",
          showEdit: true,
        }}
      />
      <Loading open={isLoading} />
    </>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "site.name",
    label: "Site",
  },
  {
    name: "building.name",
    label: "Prédio",
  },
  {
    name: "floor.name",
    label: "Andar",
  },
  {
    name: "room.name",
    label: "Sala",
  },
  {
    name: "equipment.component",
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
  {
    name: "maintenanceTypeDescription",
    label: "Tipo de manutenção",
  },
  {
    name: "status",
    label: "Status",
    renderComponent: (status) => <WorkOrderStatus status={status} />,
  },
];
