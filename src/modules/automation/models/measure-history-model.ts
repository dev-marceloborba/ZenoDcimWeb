import { EquipmentParameterModel } from "./automation-model";

export interface MeasureHistoryModel {
  value: any;
  timestamp: Date;
  parameter: EquipmentParameterModel;
}

export interface MeasureHistoryViewModel {
  site?: string;
  building?: string;
  floor?: string;
  room?: string;
  equipment?: string;
  parameter?: string;
  initialDate?: Date;
  finalDate?: Date;
}

export type MeasuresHistoryModel = MeasureHistoryModel[];
