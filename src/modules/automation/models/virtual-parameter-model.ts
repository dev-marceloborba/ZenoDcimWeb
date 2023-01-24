import { AlarmRulesModel } from "./alarm-rule-model";

export interface VirtualParameterViewModel {
  name: string;
  unit: string;
  scale: number;
  expression: string;
}

export interface VirtualParameterModel extends VirtualParameterViewModel {
  id: string;
  alarmRules?: AlarmRulesModel[];
}

export type VirtualParametersModel = VirtualParameterModel[];

export type UpdateVirtualParameterViewModel = VirtualParameterModel;
