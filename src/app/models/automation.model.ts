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
