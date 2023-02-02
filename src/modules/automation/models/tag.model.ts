import { AlarmModel } from "./alarm-model";

export interface TagModel {
  value: number;
  unit: string;
  timestamp: Date | null;
  alarms?: AlarmModel[];
}
