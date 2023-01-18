import { EEquipmentStatus } from "modules/automation/models/automation-model";
import { BaseEquipmentModel } from "./base-equipment.model";
import { ERackMount, RackModel } from "./rack.model";

export interface RackEquipmentModel {
  id: string;
  baseEquipment: BaseEquipmentModel;
  client: string;
  function: string;
  initialPosition: number;
  finalPosition: number;
  rackMountType: ERackMount;
  rackEquipmentOrientation: ERackEquipmentOrientation;
  size: string;
  occupation: number;
  power: number;
  weight: number;
  status: EEquipmentStatus;
  description: string;
  rack: RackModel;
  rackEquipmentType: ERackEquipmentType;
}

export interface CreateRackEquipmentViewModel {
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  initialPosition: number;
  finalPosition: number;
  rackEquipmentType: ERackEquipmentType;
  rackId: string;
  client: string;
  function: string;
  rackMountType: ERackMount;
  rackEquipmentOrientation: ERackEquipmentOrientation;
  size: string;
  occupation: number;
  power: number;
  weight: number;
  status: EEquipmentStatus;
  description: string;
}

export interface RackEquipmentViewModel {
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  initialPosition: number;
  finalPosition: number;
  rackEquipmentType: ERackEquipmentType;
  client: string;
  function: string;
  rackMountType: ERackMount;
  rackEquipmentOrientation: ERackEquipmentOrientation;
  size: string;
  occupation: number;
  weight: number;
  status: EEquipmentStatus;
  description: string;
}

export interface UpdateRackEquipmentViewModel {
  id: string;
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  initialPosition: number;
  finalPosition: number;
  rackEquipmentType: ERackEquipmentType;
  client: string;
  function: string;
  rackMountType: ERackMount;
  rackEquipmentOrientation: ERackEquipmentOrientation;
  size: string;
  occupation: number;
  weight: number;
  status: EEquipmentStatus;
  description: string;
}

export interface RackEquipmentsTableViewModel {
  id: string;
  name: string;
  model: string;
  manufactor: string;
  size: string;
  serialNumber: string;
  initialPosition: number;
  finalPosition: number;
  rackEquipmentType: ERackEquipmentType | string;
  client: string;
  function: string;
  rackMountType: ERackMount | string;
  rackEquipmentOrientation: ERackEquipmentOrientation | string;
  occupation: number;
  weight: number;
  status: EEquipmentStatus | string;
  description: string;
}

export enum ERackEquipmentType {
  SERVER = 0,
  SWITCH = 1,
  STORAGE = 2,
  BACKUP_ROBOT = 3,
}

export enum ERackEquipmentOrientation {
  FRONTSIDED = 0,
  BACKSIDED = 1,
  BOTHSIDED = 2,
}
