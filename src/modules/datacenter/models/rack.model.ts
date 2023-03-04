import { BuildingModel, FloorModel, SiteModel } from "./datacenter-model";
import { RoomModel } from "./room.model";

export interface RackModel {
  id: string;
  name: string;
  localization: string;
  size: string;
  capacity: number;
  power: number;
  weight: number;
  description: string;
  site: SiteModel;
  building: BuildingModel;
  floor: FloorModel;
  room: RoomModel;
  statistics?: RackStatistics;
  rackSlots?: RackSlot[];
}

export interface RackTableViewModel {
  id: string;
  name: string;
  localization: string;
  size: string;
  capacity: number;
  power: number;
  weight: number;
  description: string;
  site: string;
  building: string;
  floor: string;
  room: string;
  siteId: string;
  buildingId: string;
  floorId: string;
  roomId: string;
}

export interface CreateRackViewModel {
  name: string;
  localization: string;
  size: string;
  capacity: number;
  power: number;
  weight: number;
  description: string;
  siteId: string;
  buildingId: string;
  floorId: string;
  roomId: string;
}

export interface UpdateRackViewModel {
  id: string;
  name: string;
  localization: string;
  size: string;
  capacity: number;
  power: number;
  weight: number;
  description: string;
}

export interface RackStatistics {
  availablePower: number;
  availableWeight: number;
  availableSpace: number;
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
  rackMountType: ERackMount;
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
