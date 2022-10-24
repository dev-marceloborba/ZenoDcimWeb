import { BaseEquipmentModel } from "./base-equipment.model";
import { RackModel } from "./rack.model";

export interface RackEquipmentModel {
  id: string;
  baseEquipment: BaseEquipmentModel;
  initialPosition: number;
  finalPosition: number;
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
  rackLocalization?: string;
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
}

export interface RackEquipmentsTableViewModel {
  id: string;
  name: string;
  model: string;
  manufactor: string;
  size: number;
  serialNumber: string;
  initialPosition: number;
  finalPosition: number;
  rackEquipmentType: ERackEquipmentType;
}

export enum ERackEquipmentType {
  SERVER = 0,
  SWITCH = 1,
  STORAGE = 2,
  BACKUP_ROBOT = 3,
}
