export interface PlcResponse extends PlcRequest {
  id: string;
  modbusTags?: ModbusTagResponse[];
}

export interface PlcRequest {
  name: string;
  manufactor: string;
  model: string;
  ipAddress: string;
  tcpPort: number;
  scan: number;
}

export type ModbusDataType = "Holding Register" | "Coil";

export interface ModbusTagResponse extends ModbusTagRequest {
  id: string;
}

export interface ModbusTagRequest {
  modbusDevice: string;
  address: number;
  size: number;
  dataType: ModbusDataType;
  name: string;
  deadband: number;
}

export interface AlarmRequest {
  name: string;
  messageOn: string;
  messageOff: string;
  priority: EAlarmPriority;
  status: EAlarmStatus;
  setpoint: number;
  enabled: boolean;
  tagName: string;
}

export interface AlarmResponse extends AlarmRequest {
  id: string;
}

export enum EAlarmPriority {
  VERY_LOW = 0,
  LOW = 1,
  HIGH = 2,
  VERY_HIGH = 3,
}

export enum EAlarmStatus {
  INACTIVE = 1,
  ACTIVE = 2,
  ACKED = 3,
}
