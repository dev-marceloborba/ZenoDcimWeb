import {
  BuildingModel,
  FloorModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";
import { RoomModel } from "modules/datacenter/models/room.model";
import { AlarmRuleEditor, AlarmRulesModel } from "./alarm-rule-model";

export enum EEquipmentGroup {
  ENERGY = 0,
  CLIM = 1,
  TELECOM = 2,
}

export enum EEquipmentStatus {
  ARCHIVED = 0,
  INSTALLED = 1,
  OFF_SITE = 2,
  PLANNED = 3,
  POWERED_OFF = 4,
  STORAGE = 5,
}

export interface EquipmentViewModel {
  buildingId: string;
  floorId: string;
  roomId: string;
  siteId: string;
  component: string;
  componentCode: string;
  description: string;
  manufactor: string;
  status: EEquipmentStatus;
  group: EEquipmentGroup;
  weight: number;
  size: string;
  powerLimit: number;
}

export interface UpdateEquipmentViewModel {
  id: string;
  buildingId: string;
  floorId: string;
  roomId: string;
  siteId: string;
  component: string;
  componentCode: string;
  manufactor: string;
  status: EEquipmentStatus;
  description: string;
  group: EEquipmentGroup;
  weight: number;
  size: string;
  powerLimit: number;
}

export interface EquipmentModel {
  id: string;
  component: string;
  componentCode: string;
  description: string;
  manufactor: string;
  status: EEquipmentStatus;
  group: EEquipmentGroup;
  createdDate: Date | string;
  equipmentParameters?: EquipmentParameterModel[];
  weight: number;
  size: string;
  powerLimit: number;
  building?: BuildingModel;
  floor?: FloorModel;
  room?: RoomModel;
  site?: SiteModel;
  buildingId: string;
  floorId: string;
  roomId: string;
  siteId: string;
}

export interface EquipmentParameterViewModel {
  equipmentId?: string;
  name: string;
  unit: string;
  scale: number;
  dataSource: string;
  address: string;
  expression?: string;
  pathname: string;
}

export interface EquipmentParameterEditor {
  id: string;
  equipmentId: string;
  name: string;
  unit: string;
  scale: number;
  dataSource: string;
  address: string;
  expression?: string;
  alarmRules?: AlarmRuleEditor[];
  pathname: string;
}

export interface UpdateEquipmentParameterViewModel {
  id: string;
  name: string;
  unit: string;
  scale: number;
  dataSource: string;
  address: string;
  expression?: string;
  pathname: string;
}

export interface EquipmentParameterModel extends EquipmentParameterViewModel {
  id: string;
  alarmRules?: AlarmRulesModel;
  pathname: string;
  equipment: EquipmentModel;
  discriminator: string;
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
  parametersId: string[];
}

export interface EditEquipmentParameterGroupViewModel {
  id: string;
  name: string;
}

type ParameterGroupAssignment = {
  id: string;
  parameter: ParameterModel;
};

export interface EquipmentParameterGroupModel
  extends EquipmentParameterGroupViewModel {
  id: string;
  parameterGroupAssignments?: ParameterGroupAssignment[];
}

export interface ParameterViewModel {
  name: string;
  unit: string;
  scale: number;
  expression?: string;
}

export interface UpdateParameterViewModel {
  id: string;
  name: string;
  unit: string;
  scale: number;
  expression?: string;
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
