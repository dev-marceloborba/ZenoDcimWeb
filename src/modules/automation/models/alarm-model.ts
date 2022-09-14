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
}

export enum EAlarmStatus {
  INACTIVE = 1,
  ACTIVE = 2,
  ACKED = 3,
}

export interface AlarmViewModel {
  initialDate?: Date | null;
  finalDate?: Date | null;
}
