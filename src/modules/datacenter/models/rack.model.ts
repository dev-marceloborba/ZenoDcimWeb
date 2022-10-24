export interface RackModel {
  id: string;
  localization: string;
  size: number;
}

export interface CreateRackViewModel {
  localization: string;
  size: number;
}

export interface UpdateRackViewModel {
  id: string;
  localization: string;
  size: number;
}

export interface RackStatistcsModel {
  totalEquipments: number;
  totalOccupedSlots: number;
  availablePositions: number;
  occupedPositions: number;
  percentageUsedSpace: number;
  percentageAvailableSpace: number;
  totalAvailableSpace: number;
  totalUsedSpace: number;
  rackSlots: RackSlot[];
}

export interface RackSlot {
  initialPosition: number;
  finalPosition: number;
  description: string;
  equipmentId: string;
}
