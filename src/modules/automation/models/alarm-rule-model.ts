export interface AlarmRuleViewModel {
  name: string;
  priority: EAlarmPriority;
  conditional: EAlarmConditonal;
  setpoint: number;
  equipmentParameterId: string;
  enableNotification: boolean;
}
export interface AlarmRuleModel extends AlarmRuleViewModel {
  id: string;
}
export type AlarmRulesModel = AlarmRuleModel[];
export type UpdateAlarmRuleViewModel = AlarmRuleModel;
export enum EAlarmPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}
export enum EAlarmConditonal {
  EQUAL = 0,
  GREATER = 1,
  GREATER_EQUAL = 2,
  LOWER = 3,
  LOWER_EQUAL = 4,
}
