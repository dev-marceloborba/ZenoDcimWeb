import { EquipmentModel } from "modules/automation/models/automation-model";

export interface SiteViewModel {
  name: string;
}

export interface SiteModel extends SiteViewModel {
  id: string;
  buildings: BuildingModel[];
}

export type BuildingViewModel = {
  campus: string;
  name: string;
};

export interface BuildingModel extends BuildingViewModel {
  id: string;
  floors?: FloorModel[];
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
}

export interface FloorModel extends FloorViewModel {
  id: string;
  rooms?: RoomModel[];
}

export interface RoomViewModel {
  buildingId: string;
  floorId: string;
  name: string;
}

export interface RoomModel extends RoomViewModel {
  id: string;
  equipments?: EquipmentModel[];
}