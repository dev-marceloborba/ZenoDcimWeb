import {
  BuildingModel,
  FloorModel,
  RoomModel,
  SiteModel,
} from "./datacenter-model";

export interface RackModel {
  id: string;
  localization: string;
  size: number;
  weight: number;
  site: SiteModel;
  building: BuildingModel;
  floor: FloorModel;
  room: RoomModel;
}

export interface RackTableViewModel {
  id: string;
  localization: string;
  size: number;
  weight: number;
  site: string;
  building: string;
  floor: string;
  room: string;
}

export interface CreateRackViewModel {
  weight: number;
  localization: string;
  size: number;
  siteId: string;
  buildingId: string;
  floorId: string;
  roomId: string;
}

export interface UpdateRackViewModel {
  id: string;
  localization: string;
  size: number;
}

export interface RackStatistcsModel {
  totalEquipments: number;
  totalOccupedSlots: number;
  availablePositions: number;
  occupedPositions: number;
  percentageUsedSpace: number;
  percentageAvailableSpace: number;
  totalAvailableSpace: number;
  totalUsedSpace: number;
  rackSlots: RackSlot[];
}

export interface RackSlot {
  initialPosition: number;
  finalPosition: number;
  description: string;
  equipmentId: string;
}
