export interface VirtualParameterViewModel {
  name: string;
  unit: string;
  scale: number;
  expression: string;
}

export interface VirtualParameterModel extends VirtualParameterViewModel {
  id: string;
}

export type VirtualParametersModel = VirtualParameterModel[];

export type UpdateVirtualParameterViewModel = VirtualParameterModel;
