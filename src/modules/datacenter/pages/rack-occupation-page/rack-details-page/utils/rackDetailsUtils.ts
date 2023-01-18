import { EEquipmentStatus } from "modules/automation/models/automation-model";
import {
  ERackEquipmentOrientation,
  ERackEquipmentType,
} from "modules/datacenter/models/rack-equipment.model";
import { ERackMount } from "modules/datacenter/models/rack.model";

export function getMountTypeDescription(mountType: ERackMount) {
  switch (mountType) {
    case ERackMount.BDJ_BACKSIDE:
      return "Bandeja, Backsided";
    case ERackMount.BDJ_FRONTSIDE:
      return "Bandeja, Frontsided";
    case ERackMount.LATERAL:
      return "Lateral";
    case ERackMount.NO_ONE:
      return "Nenhum";
    case ERackMount.RACK_19_BACKSIDE:
      return "Rack 19”, Backside";
    case ERackMount.RACK_19_FRONTSIDE:
      return "Rack 19”, Frontside";
    case ERackMount.RACK_19_BOTHSIDE:
      return "Rack 19”, Bothside";
    case ERackMount.WITH_ACESSORY_FRONTSIDE:
      return "Com acessório, Frontsided";
    case ERackMount.WITH_ACESSORY_BACKSIDE:
      return "Com acessório, Backsided";
  }
}

export function getEquipmentOrientation(
  equipmentOrientation: ERackEquipmentOrientation
) {
  switch (equipmentOrientation) {
    case ERackEquipmentOrientation.BOTHSIDED:
      return "Bothsided";
    case ERackEquipmentOrientation.FRONTSIDED:
      return "Frontsided";
    case ERackEquipmentOrientation.BACKSIDED:
      return "Backsided";
  }
}

export function getRackEquipmentType(rackEquipmentType: ERackEquipmentType) {
  switch (rackEquipmentType) {
    case ERackEquipmentType.SERVER:
      return "Servidor";
    case ERackEquipmentType.SWITCH:
      return "Switch";
    case ERackEquipmentType.STORAGE:
      return "Storage";
    case ERackEquipmentType.BACKUP_ROBOT:
      return "Robô de backup";
  }
}

export function getEquipmentStatus(status: EEquipmentStatus) {
  switch (status) {
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
