import { EquipmentParameterModel } from "./automation-model";

export interface SiteCardModel {
  id: string;
  siteId: string;
  name: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
  parameter4: ParameterInfo | null;
  parameter5: ParameterInfo | null;
  parameter6: ParameterInfo | null;
}
export interface SiteCardViewModel {}

type ParameterInfo = {
  description: string;
  enabled: boolean;
  equipmentParameterId: string;
  equipmentParameter?: EquipmentParameterModel;
};

export interface UpdateSiteCardViewModel {
  id: string;
  parameter1: ParameterInfo | null;
  parameter2: ParameterInfo | null;
  parameter3: ParameterInfo | null;
  parameter4: ParameterInfo | null;
  parameter5: ParameterInfo | null;
  parameter6: ParameterInfo | null;
}
