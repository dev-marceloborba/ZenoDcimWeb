export type BuildingRequest = {
  campus: string;
  name: string;
};

export interface BuildingResponse extends BuildingRequest {
  id: string;
  floors?: FloorResponse[];
}

export type BuildingsResponse = BuildingResponse[];

export interface FloorRequest {
  buildingId: string;
  name: string;
}

export interface FloorResponse extends FloorRequest {
  id: string;
  rooms?: RoomResponse[];
}

export interface RoomRequest {
  buildingId: string;
  floorId: string;
  name: string;
}

export interface RoomResponse extends RoomRequest {
  id: string;
  equipments?: EquipmentResponse[];
}

export enum EEquipmentGroup {
  ENERGY = 0,
  CLIM = 1,
  TELECOM = 2,
}

export enum EEquipmentStatus {
  ONLINE = 0,
  OFFLINE = 1,
  INDETERMINATE = 2,
}

export interface EquipmentRequest {
  buildingId: string;
  floorId: string;
  roomId: string;
  class: string;
  component: string;
  componentCode: string;
  description: string;
  group: EEquipmentGroup;
}

export interface EquipmentResponse extends EquipmentRequest {
  id: string;
  status: EEquipmentStatus;
  alarms: number;
  createdDate: Date;
  equipmentParameters?: EquipmentParameterResponse[];
}

export interface EquipmentParameterRequest {
  equipmentId: string;
  name: string;
  unit: string;
  lowLimit: number;
  highLimit: number;
  scale: number;
  dataSource: string;
  address: string;
}

export interface EquipmentParameterResponse extends EquipmentParameterRequest {
  id: string;
}

export type BuildingMerged = {
  class: string;
  component: string;
  componentCode: string;
  description: string;
  building: string;
  floor: string;
  room: string;
};

export type MultipleEquipmentsRequest = {
  equipments: EquipmentRequest[];
};

export interface MultipleEquipmentParameterRequest {
  parameters: EquipmentParameterRequest[];
}

export interface MultipleEquipmentParameterResponse
  extends MultipleEquipmentParameterRequest {}
