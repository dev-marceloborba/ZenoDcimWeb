import { ParameterViewModel } from "modules/automation/models/automation-model";

export type ParameterPlain = {
  building: string;
  floor: string;
  room: string;
  equipment: string;
  numRepeat: number;
  parameter: string;
  unit: string;
  min: number;
  max: number;
  dataSample: string;
  aquisitionType: string;
  additionalInfo: string;
};

export const rowToParameterPlain = (data: any[]) => {
  return data.map<ParameterPlain>((row: any) => ({
    building: row[0],
    floor: row[1],
    room: row[2],
    equipment: row[3],
    numRepeat: row[4],
    parameter: row[5],
    unit: row[6],
    min: row[7],
    max: row[8],
    dataSample: row[9],
    aquisitionType: row[10],
    additionalInfo: row[11],
  }));
};

export const parameterPlainToParameterViewModel = (
  data: ParameterPlain[],
  groupId: string
) => {
  return data.map<ParameterViewModel>((d) => ({
    name: d.parameter,
    highLimit: d.max,
    lowLimit: d.min,
    scale: 1,
    unit: d.unit,
    groupId,
  }));
};

export const customRules = () => {
  const splitRowsIntoEquipments = (description: string, repeat: number) => {
    let equipments = [] as string[];
    for (let i = 0; i < repeat; i++) {
      equipments.push(`${description} - ${i + 1}`);
    }
    return equipments;
  };
  return {
    splitRowsIntoEquipments,
  };
};
