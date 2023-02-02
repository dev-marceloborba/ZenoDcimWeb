import { EquipmentParameterModel } from "./automation-model";

export interface BuildingCardModel {
  id: string;
  buildingId?: string;
  siteId?: string;
  name: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
  parameter4: ParameterInfo | null;
  parameter5: ParameterInfo | null;
  parameter6: ParameterInfo | null;
}
export interface BuildingCardViewModel {}

type ParameterInfo = {
  description: string;
  enabled: boolean;
  equipmentParameterId: string;
  equipmentParameter?: EquipmentParameterModel;
};

export interface UpdateBuildingCardViewModel {
  id: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
  parameter4: ParameterInfo | null;
  parameter5: ParameterInfo | null;
  parameter6: ParameterInfo | null;
}
