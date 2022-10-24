export interface BaseEquipmentModel {
  id: string;
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  size: number;
}

export interface CreateBaseEquipmentViewModel {
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  size: number;
}
