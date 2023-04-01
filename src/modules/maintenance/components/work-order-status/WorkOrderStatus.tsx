import Chip, { ChipProps } from "@mui/material/Chip";
import { EWorkOrderStatus } from "modules/maintenance/models/work-order.model";

type WorkOrderStatusProps = {
  status: EWorkOrderStatus;
} & ChipProps;

type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

type ChipVariant = "filled" | "outlined";

type ChipConfiguration = {
  color: ChipColor;
  variant: ChipVariant;
  label: string;
};

const WorkOrderStatus: React.FC<WorkOrderStatusProps> = ({
  status,
  ...props
}) => {
  const colorProps = getColoredStatus(status);
  return <Chip {...props} {...colorProps} />;
};

function getColoredStatus(status: EWorkOrderStatus): ChipConfiguration {
  switch (status) {
    case EWorkOrderStatus.DRAFT:
      return {
        variant: "filled",
        color: "default",
        label: "Rascunho",
      };
    case EWorkOrderStatus.IN_APPROVAL:
      return {
        variant: "outlined",
        color: "secondary",
        label: "Em aprovação",
      };
    case EWorkOrderStatus.APPROVED:
      return {
        variant: "outlined",
        color: "primary",
        label: "Aprovada",
      };
    case EWorkOrderStatus.IN_EXECUTION:
      return {
        variant: "filled",
        color: "info",
        label: "Em execução",
      };
    case EWorkOrderStatus.FINISHED:
      return {
        variant: "filled",
        color: "success",
        label: "Finalizada",
      };
    case EWorkOrderStatus.REJECTED:
      return {
        variant: "filled",
        color: "error",
        label: "Rejeitada",
      };
    case EWorkOrderStatus.CANCELED:
      return {
        variant: "outlined",
        color: "error",
        label: "Cancelada",
      };
    default:
      return {
        variant: "outlined",
        color: "error",
        label: "Erro",
      };
  }
}

export default WorkOrderStatus;
