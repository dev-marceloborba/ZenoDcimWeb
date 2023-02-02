import { EAlarmStatus, EAlarmType } from "./alarm-model";
import { EAlarmConditonal, EAlarmPriority } from "./alarm-rule-model";

export type RealtimeModel = {
  name: string;
  totalAlarms: number;
  totalAlarmsByEnergy: number;
  totalAlarmsByClimate: number;
  totalAlarmsByTelecom: number;
  buildings: {
    name: string;
    totalAlarms: number;
    totalAlarmsByEnergy: number;
    totalAlarmsByClimate: number;
    totalAlarmsByTelecom: number;
    floors: {
      name: string;
      totalAlarms: number;
      rooms: {
        name: string;
        totalAlarms: number;
        equipments: {
          name: string;
          totalAlarms: number;
          parameters: {
            name: string;
            value: number;
            unit: string;
            timestamp: Date;
            totalAlarms: number;
            pathname: string;
            alarms: {
              id: string;
              name: string;
              conditional: EAlarmConditonal;
              enabled: boolean;
              inDate: Date | null;
              outDate: Date | null;
              recognizedDate: Date | null;
              pathname: string;
              priority: EAlarmPriority;
              type: EAlarmType;
              status: EAlarmStatus;
              value: number;
              ruleId: string;
              operator: string;
            }[];
          }[];
        }[];
      }[];
    }[];
  }[];
}[];
