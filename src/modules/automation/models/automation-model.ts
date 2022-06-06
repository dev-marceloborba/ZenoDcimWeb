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

export interface EquipmentViewModel {
  buildingId: string;
  floorId: string;
  roomId: string;
  class: string;
  component: string;
  componentCode: string;
  description: string;
  group: EEquipmentGroup;
}

export interface EquipmentModel extends EquipmentViewModel {
  id: string;
  status: EEquipmentStatus;
  group: EEquipmentGroup;
  alarms: number;
  createdDate: Date;
  equipmentParameters?: EquipmentParameterModel[];
}

export interface EquipmentParameterViewModel {
  equipmentId?: string;
  name: string;
  unit: string;
  lowLimit: number;
  highLimit: number;
  scale: number;
  dataSource: string;
  address: string;
}

export interface EquipmentParameterModel extends EquipmentParameterViewModel {
  id: string;
}

export type MultipleEquipmentsViewModel = {
  equipments: EquipmentViewModel[];
};

export interface MultipleEquipmentParameterViewModel {
  parameters: EquipmentParameterViewModel[];
}

export interface MultipleEquipmentParameterModel
  extends MultipleEquipmentParameterViewModel {}

export interface EquipmentParameterGroupViewModel {
  name: string;
  parameters: EquipmentParameterViewModel[];
}

export interface EquipmentParameterGroupModel
  extends EquipmentParameterGroupViewModel {
  id: string;
}

export interface ParameterViewModel {
  name: string;
  unit: string;
  lowLimit: number;
  highLimit: number;
  scale: number;
  groupId: string;
}

export interface ParameterModel extends ParameterViewModel {
  id: string;
}