// import { EquipmentModel } from "modules/automation/models/automation-model";
import { RoomModel } from "./room.model";

export interface SiteViewModel {
  name: string;
}

export interface UpdateSiteViewModel {
  id: string;
  name: string;
}

export interface SiteModel extends SiteViewModel {
  id: string;
  buildings: BuildingModel[];
}

export type BuildingViewModel = {
  name: string;
  siteId: string;
};

export interface UpdateBuildingViewModel {
  id: string;
  name: string;
  siteId?: string;
}

export interface BuildingModel extends BuildingViewModel {
  id: string;
  floors?: FloorModel[];
  site?: SiteModel;
}

export type BuildingsModel = BuildingModel[];

export type BuildingMerged = {
  class: string;
  component: string;
  componentCode: string;
  description: string;
  building: string;
  floor: string;
  room: string;
};

export interface FloorViewModel {
  buildingId: string;
  name: string;
  siteId?: string;
}

export interface UpdateFloorViewModel {
  id: string;
  name: string;
  buildingId?: string;
  siteId?: string;
}

export interface FloorModel extends FloorViewModel {
  id: string;
  building?: BuildingModel;
  rooms?: RoomModel[];
}

// export interface RoomViewModel {
//   buildingId: string;
//   floorId: string;
//   name: string;
//   rackCapacity: number;
//   powerCapacity: number;
//   siteId?: string;
// }

// export interface RoomModel extends RoomViewModel {
//   id: string;
//   floor?: FloorModel;
//   equipments?: EquipmentModel[];
// }

// export interface UpdateRoomViewModel {
//   id: string;
//   name: string;
//   floorId?: string;
//   buildingId?: string;
//   siteId?: string;
// }
