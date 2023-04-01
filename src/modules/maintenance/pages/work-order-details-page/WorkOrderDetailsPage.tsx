import HeroContainer from "modules/shared/components/HeroContainer";
import useRouter from "modules/core/hooks/useRouter";
import {
  useApproveWorkOrderMutation,
  useFindWorkOrderByIdQuery,
  useRejectWorkOrderMutation,
} from "modules/maintenance/services/maintenance.service";
import Loading from "modules/shared/components/Loading";
import CardSection from "modules/shared/components/card-section/CardSectionv3";
import { Button, Stack, Typography } from "@mui/material";
import WorkOrderStatus from "modules/maintenance/components/work-order-status/WorkOrderStatus";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import ApproveWorkOrderFormModal from "modules/maintenance/modals/approve-work-order-form-modal/ApproveWorkOrderFormModal";
import { useFindAllUsersQuery } from "modules/user/services/authentication-service";
import RefuseWorkOrderFormModal from "modules/maintenance/modals/refuse-work-order-form-modal/RefuseWorkOrderFormModal";
import { useAuth } from "app/hooks/useAuth";

export default function WorkOrderDetailsPage() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const { showModal } = useModal();
  const { params } = useRouter();
  const { data: workOrder, isLoading } = useFindWorkOrderByIdQuery(
    params.workOrderId!
  );
  const { data: users } = useFindAllUsersQuery();
  const [approveOrder, { isLoading: approveLoading }] =
    useApproveWorkOrderMutation();
  const [rejectOrder, { isLoading: rejectLoading }] =
    useRejectWorkOrderMutation();

  const handleApproveOrder = () => {
    const modal = showModal(ApproveWorkOrderFormModal, {
      title: "Aceitar ordem de serviço",
      data: {
        technicians:
          users?.map((user) => ({ id: user.id, name: user.firstName })) ?? [],
      },
      onConfirm: async (formData) => {
        console.log(formData);
        modal.hide();
        try {
          await approveOrder({
            id: workOrder!.id,
            user: formData.executor,
          }).unwrap();
          toast.open({ message: "Ordem de serviço aprovada" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao aprovar ordem de serviço",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        style: {
          width: 450,
        },
      },
    });
  };

  const handleRefuseOrder = () => {
    const modal = showModal(RefuseWorkOrderFormModal, {
      title: "Rejeitar ordem de serviço",
      onConfirm: async (formData) => {
        console.log(formData);
        modal.hide();
        try {
          await rejectOrder({
            id: workOrder!.id,
            user: currentUser?.name,
          }).unwrap();
          toast.open({ message: "Ordem de serviço rejeitada" });
        } catch (error) {
          toast.open({
            message: "Erro ao rejeitar ordem de serviço",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        style: {
          width: 450,
        },
      },
    });
  };

  return (
    <HeroContainer>
      <Stack direction="row" alignItems="center">
        <Typography variant="h4">{workOrder?.title}</Typography>
        <WorkOrderStatus status={workOrder?.status!} sx={{ ml: 3 }} />
      </Stack>
      <CardSection
        title="Local"
        items={[
          {
            title: "Site",
            description: workOrder?.site,
          },
          {
            title: "Prédio",
            description: workOrder?.building,
          },
          {
            title: "Andar",
            description: workOrder?.floor,
          },
          {
            title: "Sala",
            description: workOrder?.room,
          },
        ]}
      />
      <CardSection
        title="Identidade"
        items={[
          {
            title: "Código OS",
            description: workOrder?.id,
            defaultSize: 6,
          },
          {
            title: "Título",
            description: workOrder?.title,
          },
          {
            title: "Equipamento",
            description: workOrder?.equipment,
          },
        ]}
        sx={{ my: 1 }}
      />
      <CardSection
        title="Dados da ordem"
        items={[
          {
            title: "Tipo de ordem",
            description: workOrder?.orderType,
          },
          {
            title: "Natureza da ordem",
            description: workOrder?.nature,
          },
          {
            title: "Tipo de manutenção",
            description: workOrder?.maintenanceType,
          },
          {
            title: "Prioridade",
            description: workOrder?.priority,
          },
          {
            title: "Custo",
            description: `R$ ${workOrder?.cost.toString()}`,
          },
          {
            title: "Responsável",
            description: workOrder?.supervisor,
          },
          {
            title: "Tempo efetivo",
            description: `${workOrder?.realRepairTime} h`,
          },
          {
            title: "Tempo estimado",
            description: `${workOrder?.estimatedRepairTime} h`,
          },
          {
            title: "Data inicial",
            description: workOrder?.initialDate,
          },
          {
            title: "Data final",
            description: workOrder?.finalDate,
          },
          {
            title: "",
            description: "",
            defaultSize: 6,
          },
          {
            title: "Descrição",
            description: workOrder?.description,
            defaultSize: 6,
          },
        ]}
      />
      <Stack direction="row" alignItems="center" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApproveOrder}
        >
          Aprovar ordem
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleRefuseOrder}
          sx={{ ml: 2 }}
        >
          Recusar ordem
        </Button>
      </Stack>
      <Loading open={isLoading || approveLoading || rejectLoading} />
    </HeroContainer>
  );
}
