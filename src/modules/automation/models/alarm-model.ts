import { EAlarmPriority } from "./alarm-rule-model";

export interface AlarmModel {
  value: number;
  status: number;
  enabled: boolean;
  id: string;
  createdDate: string;
  inDate: Date;
  outDate: Date;
  recognizedDate: Date;
  pathname: string;
  priority: EAlarmPriority;
  notificationEnabled: boolean;
  type: EAlarmType;
  operator: string;
  alarmRule: {
    id: string;
    name: string;
    setpoint: number;
    priority: number;
    equipmentParameter: {
      id: string;
      name: string;
      equipment: {
        name: string;
        room: {
          name: string;
          floor: {
            name: string;
            building: {
              name: string;
            };
          };
        };
      };
    };
  };
}

export interface AlarmTableViewModel {
  id: string;
  building: string;
  floor: string;
  room: string;
  site?: string;
  equipment: string;
  parameter: string;
  value: number;
  rule: string;
  ruleId: string;
  inDate: Date | null;
  outDate: Date | null;
  recognizedDate: Date | null;
  acked: boolean;
  status: EAlarmStatus;
  priority: EAlarmPriority;
  type: EAlarmType;
  parameterId: string;
  operator: string;
}

export enum EAlarmStatus {
  INACTIVE = 1,
  ACTIVE = 2,
  ACKED = 3,
}

export enum EAlarmType {
  ALARM = 0,
  EVENT = 1,
}

export interface AlarmViewModel {
  initialDate?: Date | null;
  finalDate?: Date | null;
}

export interface AlarmFilterViewModel {
  initialDate?: Date | null;
  finalDate?: Date | null;
  priority: number | null;
  type: number | null;
}

export type AlarmZone =
  | "parameter"
  | "equipment"
  | "room"
  | "floor"
  | "building"
  | "site";

export const getActiveAlarms = (
  alarms: AlarmTableViewModel[],
  zone: AlarmZone,
  filter: string
) => alarms.filter((alarm) => alarm[zone] === filter).length;
