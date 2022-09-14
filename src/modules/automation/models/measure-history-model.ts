import { EquipmentParameterModel } from "./automation-model";

export interface MeasureModel {
  value: any;
  timestamp: string;
  name?: string;
}

export interface MeasureHistoryModel extends MeasureModel {
  site: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  parameter: string;
}

export interface MeasureHistoryViewModel {
  site?: string;
  building?: string;
  floor?: string;
  room?: string;
  equipment?: string;
  parameter?: string;
  initialDate?: Date | null;
  finalDate?: Date | null;
}

export type MeasuresHistoryModel = MeasureHistoryModel[];

export type MeasureStatisticsModel = {
  minimum: number;
  maximum: number;
  average: number;
};

export type MeasureStatisticsViewModel = {
  initialDate?: Date | null;
  finalDate?: Date | null;
  name: string;
};
