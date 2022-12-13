export interface BuildingCardModel {
  buildingId: string;
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
  equipmentParameterId: string;
};
