export interface BaseEquipmentResponse extends BaseEquipmentRequest {
  id: string;
}

export interface BaseEquipmentRequest {
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
}

export interface RackEquipmentResponse extends RackEquipmentRequest {
  id: string;
}

export interface RackEquipmentRequest {
  id: string;
  baseEquipment: BaseEquipmentResponse;
  initialPosition: number;
  finalPosition: number;
  rackEquipmentType: number;
}

export interface RackResponse {
  id: string;
  size: string;
  localization: string;
  rackEquipments?: RackEquipmentResponse[];
}

export interface RackRequest {
  size: number;
  localization: string;
}

export enum ERackEquipmentType {
  SERVER = 0,
  SWITCH = 1,
  STORAGE = 2,
  BACKUP_ROBOT = 3,
}

export type RackEquipmentMerged = {
  rackId: string;
  size: string;
  localization: string;
  equipmentType?: string;
  name?: string;
  model?: string;
  manufactor?: string;
  serialNumber?: string;
  initialPosition?: number;
  finalPosition?: number;
};

export type RacksResponse = RackResponse[];
