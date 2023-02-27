import {
  EMaintenanceType,
  EOrderPriority,
  EWorkOrderNature,
  EWorkOrderType,
} from "../models/work-order.model";

export function getMaintenanceTypeDescription(
  maintenanceType: EMaintenanceType
) {
  switch (maintenanceType) {
    case EMaintenanceType.CORRECTIVE:
      return "Corretiva";
    case EMaintenanceType.PREVENTIVE:
      return "Preventiva";
  }
}

export function getOperationNatureDescription(
  operationNature: EWorkOrderNature
) {
  switch (operationNature) {
    case EWorkOrderNature.ATTENDANCE:
      return "Acompanhamento";
    case EWorkOrderNature.CUSTOMER_SERVICE:
      return "Atendimento";
    case EWorkOrderNature.EMERGENCY:
      return "Emergência";
    case EWorkOrderNature.PLANNED:
      return "Planejada";
  }
}

export function getOrderNature(nature: EWorkOrderNature) {
  switch (nature) {
    case EWorkOrderNature.ATTENDANCE:
      return "Acompanhamento";
    case EWorkOrderNature.CUSTOMER_SERVICE:
      return "Atendimento";
    case EWorkOrderNature.EMERGENCY:
      return "Emergência";
    case EWorkOrderNature.PLANNED:
      return "Planejada";
  }
}

export function getMaintenanceType(maintenanceType: EMaintenanceType) {
  switch (maintenanceType) {
    case EMaintenanceType.CORRECTIVE:
      return "Corretiva";
    case EMaintenanceType.PREVENTIVE:
      return "Preventiva";
  }
}

export function getOrderType(orderType: EWorkOrderType) {
  switch (orderType) {
    case EWorkOrderType.ELECTRICAL:
      return "Elétrica";
    case EWorkOrderType.NETWORK:
      return "Rede";
  }
}

export function getWorkOrderPriorityDescription(
  workOrderPriority: EOrderPriority
) {
  switch (workOrderPriority) {
    case EOrderPriority.LOW:
      return "Baixa";
    case EOrderPriority.MEDIUM:
      return "Média";
    case EOrderPriority.HIGH:
      return "Alta";
  }
}
