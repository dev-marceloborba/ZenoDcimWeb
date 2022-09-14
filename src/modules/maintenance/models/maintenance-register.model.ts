export interface CreateMaintenanceRegisterViewModel {
  site: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  initialDate: Date;
  finalDate: Date;
  activity: string;
  responsible: string;
  responsibleType: EMaintenanceResponsibleType;
  maintenanceType: EMaintenanceType;
}

export interface MaintenanceRegisterModel
  extends CreateMaintenanceRegisterViewModel {
  id: string;
  status: EMaintenanceStatus;
  modifiedDate: Date;
}

export enum EMaintenanceResponsibleType {
  SUPPLIER = 0,
  INTERNAL = 1,
}

export enum EMaintenanceStatus {
  CREATED = 0,
  CLOSED = 1,
  CANCELLED = 2,
  IN_PROGRESS = 3,
  POSTPONED = 4,
}

export enum EMaintenanceType {
  PREVENTIVE = 0,
  CORRECTIVE = 1,
}
