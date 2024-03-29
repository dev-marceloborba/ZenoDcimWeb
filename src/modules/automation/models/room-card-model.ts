import { EquipmentParameterModel } from "./automation-model";

export interface RoomCardModel {
  id: string;
  buildingId?: string;
  roomId?: string;
  name: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
}
export interface RoomCardViewModel {}

type ParameterInfo = {
  description: string;
  enabled: boolean;
  equipmentParameter?: EquipmentParameterModel;
  equipmentParameterId: string;
};

export interface UpdateRoomCardViewModel {
  id: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
}
