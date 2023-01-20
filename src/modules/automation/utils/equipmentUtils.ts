import { EEquipmentStatus } from "../models/automation-model";

export function getEquipmentStatusFromEnum(e: EEquipmentStatus) {
  switch (e) {
    case EEquipmentStatus.ARCHIVED:
      return "Arquivado";
    case EEquipmentStatus.INSTALLED:
      return "Instalado";
    case EEquipmentStatus.OFF_SITE:
      return "Fora da planta";
    case EEquipmentStatus.PLANNED:
      return "Planejado";
    case EEquipmentStatus.POWERED_OFF:
      return "Desligado";
    case EEquipmentStatus.STORAGE:
      return "Armazenado";
  }
}
