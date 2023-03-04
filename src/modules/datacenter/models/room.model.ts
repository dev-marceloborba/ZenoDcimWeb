import { FloorModel } from "modules/datacenter/models/datacenter-model";
import { EquipmentModel } from "modules/automation/models/automation-model";
import { RoomCardModel } from "modules/automation/models/room-card-model";

export interface RoomModel {
  id: string;
  name: string;
  rackCapacity: number;
  powerCapacity: number;
  equipments?: EquipmentModel[];
  floor: FloorModel;
  // building: BuildingModel;
  // site: SiteModel;
  cardSettings: RoomCardModel;
}

export interface RoomEditorViewModel {
  id?: string;
  name: string;
  rackCapacity?: number;
  powerCapacity?: number;
  floorId: string;
  buildingId: string;
  siteId: string;
}
