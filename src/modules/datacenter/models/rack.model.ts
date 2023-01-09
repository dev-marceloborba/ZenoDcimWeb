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

export enum ERackMount {
  RACK_19_FRONTSIDE = 0,
  RACK_19_BACKSIDE = 1,
  RACK_19_BOTHSIDE = 2,
  BDJ_FRONTSIDE = 3,
  BDJ_BACKSIDE = 4,
  LATERAL = 5,
  WITH_ACESSORY_FRONTSIDE = 6,
  WITH_ACESSORY_BACKSIDE = 7,
  NO_ONE = 8,
}
