import { EquipmentParameterModel } from "./automation-model";

export interface EquipmentCardModel {
  id: string;
  equipmentId: string;
  roomId?: string;
  name: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
}
export interface EquipmentCardViewModel {}

type ParameterInfo = {
  description: string;
  enabled: boolean;
  equipmentParameter?: EquipmentParameterModel;
  equipmentParameterId: string;
};

export interface UpdateEquipmentCardViewModel {
  id: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
}
