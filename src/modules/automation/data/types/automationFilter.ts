import { BuildingsModel } from "modules/datacenter/models/datacenter-model";

export type FilterData = {
  energy: boolean;
  clim: boolean;
  telecom: boolean;
};

export type AutomationFiltersData = {
  building: string;
  floor: string;
  room: string;
  zone: string;
  loop: string;
  groups: {
    energy: boolean;
    clim: boolean;
    telecom: boolean;
  };
  handleBuilding(building: string): void;
  handleFloor(floor: string): void;
  handleRoom(floor: string): void;
  handleZone(zone: string): void;
  handleLoop(loop: string): void;
  handleToggleEnergyGroup(): void;
  handleToggleClimGroup(): void;
  handleToggleTelecomGroup(): void;
  buildings?: BuildingsModel;
};

export type AutomationFilterStateProps = {
  building: string;
  floor: string;
  room: string;
  zone: string;
  loop: string;
  groups: FilterData;
  buildings?: BuildingsModel;
};
