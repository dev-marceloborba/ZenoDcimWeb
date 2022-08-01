import { AlarmRulesModel } from "./alarm-rule-model";

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
  component: string;
  componentCode: string;
  description: string;
  group: EEquipmentGroup;
  weight: number;
  size: string;
  powerLimit: number;
}

export interface EquipmentModel extends EquipmentViewModel {
  id: string;
  status: EEquipmentStatus;
  group: EEquipmentGroup;
  createdDate: Date;
  equipmentParameters?: EquipmentParameterModel[];
  weight: number;
  size: string;
  powerLimit: number;
  building?: BuildingModel;
  floor?: FloorModel;
  room?: RoomModel;
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

export interface UpdateEquipmentParameterViewModel {
  id: string;
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
  alarmRules?: AlarmRulesModel;
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
}

export interface EditEquipmentParameterGroupViewModel {
  id: string;
  name: string;
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
}

export interface UpdateParameterViewModel {
  id: string;
  name: string;
  unit: string;
  lowLimit: number;
  highLimit: number;
  scale: number;
}

export interface ParameterModel extends ParameterViewModel {
  id: string;
  discriminator: string;
}

export interface EquipmentOnGroupViewModel {
  groupId: string;
  parameters: ParameterAssociation[];
}

type ParameterAssociation = {
  id: string;
};
