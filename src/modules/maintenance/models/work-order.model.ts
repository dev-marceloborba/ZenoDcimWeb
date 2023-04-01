import { EquipmentModel } from "modules/automation/models/automation-model";
import {
  BuildingModel,
  FloorModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";
import { RoomModel } from "modules/datacenter/models/room.model";

export interface WorkOrderDraftEditor {
  id?: string;
  siteId: string;
  buildingId: string;
  floorId: string;
  roomId: string;
  equipmentId: string;
  title: string;
  orderType: EWorkOrderType;
  nature: EWorkOrderNature;
  priority: EOrderPriority;
  maintenanceType: EMaintenanceType;
  description: string;
  initialDate: string;
  finalDate: string;
  estimatedRepairTime: number;
  cost?: number;
  user: string;
}

export interface CreateWorkOrderViewModel {
  siteId: string;
  buildingId: string;
  floorId: string;
  roomId: string;
  equipmentId: string;
  initialDate: string;
  finalDate: string;
  description: string;
  executor: string;
  supervisor: string;
  manager: string;
  responsibleType: EMaintenanceResponsibleType;
  maintenanceType: EMaintenanceType;
  nature: EWorkOrderNature;
  orderType: EWorkOrderType;
  priority: EOrderPriority;
  estimatedRepairTime: number;
  cost: number;
  title: string;
}

export type UpdateWorkOrderViewModel = WorkOrderModel;

export interface WorkOrderModel {
  id: string;
  status: EWorkOrderStatus;
  modifiedDate: Date;
  site: SiteModel;
  building: BuildingModel;
  floor: FloorModel;
  room: RoomModel;
  equipment: EquipmentModel;
  initialDate: string;
  finalDate: string;
  description: string;
  executor: string;
  supervisor: string;
  manager: string;
  responsibleType: EMaintenanceResponsibleType;
  maintenanceType: EMaintenanceType;
  nature: EWorkOrderNature;
  orderType: EWorkOrderType;
  priority: EOrderPriority;
  estimatedRepairTime: number;
  realRepairTime: number;
  cost: number;
  title: string;
}

export type WorkEventsTableViewModel = {
  id: string;
  title: string;
  equipment: string;
  maintenanceType: string;
  initialDate: string;
  finalDate: string;
  operationNature: string;
  responsible: string;
};

export type WorkOrderDetailsViewModel = {
  id: string;
  site: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  initialDate: string;
  finalDate: string;
  maintenanceType: string;
  orderType: string;
  nature: string;
  responsible: string;
  executor: string;
  supervisor: string;
  manager: string;
  description: string;
  title: string;
  priority: string;
  estimatedRepairTime: number;
  realRepairTime: number;
  cost: number;
  status: EWorkOrderStatus;
};

export interface WorkOrderFilterViewModel {
  status: EWorkOrderStatus;
}

export enum EMaintenanceResponsibleType {
  SUPPLIER = 0,
  INTERNAL = 1,
}

export enum EWorkOrderNature {
  ATTENDANCE = 0, // acompanhamento
  CUSTOMER_SERVICE = 1, // atendimento
  EMERGENCY = 2, //emergencia
  PLANNED = 3, // planejada
}

export enum EWorkOrderStatus {
  DRAFT = 0,
  IN_APPROVAL = 1,
  APPROVED = 2,
  WAITING_EXECUTION = 3,
  IN_EXECUTION = 4,
  FINISHED = 5,
  CANCELED = 6,
  REJECTED = 7,
}

export enum EMaintenanceType {
  PREVENTIVE = 0,
  CORRECTIVE = 1,
}

export enum EWorkOrderType {
  ELECTRICAL = 0,
  NETWORK = 1,
}

export enum EOrderPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}
