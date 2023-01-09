import { EquipmentModel } from "modules/automation/models/automation-model";
import {
  BuildingModel,
  FloorModel,
  RoomModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";

export const locationInitialState: LocationReducerState = {
  sites: [],
  buildings: [],
  floors: [],
  rooms: [],
  equipments: [],
};

export enum LocationReducerType {
  GET_SITES,
  GET_BUILDINGS_BY_SITE,
  GET_FLOORS_BY_BUILDING,
  GET_ROOMS_BY_FLOOR,
  GET_EQUIPMENTS_BY_ROOM,
}

export type LocationReducerAction = {
  type: LocationReducerType;
  payload?: any;
};

export type LocationReducerState = {
  sites: SiteModel[];
  buildings: BuildingModel[];
  floors: FloorModel[];
  rooms: RoomModel[];
  equipments: EquipmentModel[];
};

export default function locationReducer(
  state: LocationReducerState,
  action: LocationReducerAction
): LocationReducerState {
  const { type, payload } = action;

  switch (type) {
    case LocationReducerType.GET_SITES:
      const { sites } = payload;
      return {
        ...state,
        sites,
      };
    case LocationReducerType.GET_BUILDINGS_BY_SITE:
      const { siteId }: { siteId: string } = payload;
      return {
        ...state,
        buildings: state.sites.find((s) => s.id === siteId)?.buildings ?? [],
      };
    case LocationReducerType.GET_FLOORS_BY_BUILDING:
      const { buildingId }: { buildingId: string } = payload;
      return {
        ...state,
        floors: state.buildings.find((b) => b.id === buildingId)?.floors ?? [],
      };
    case LocationReducerType.GET_ROOMS_BY_FLOOR:
      const { floorId }: { floorId: string } = payload;
      return {
        ...state,
        rooms: state.floors.find((f) => f.id === floorId)?.rooms ?? [],
      };
    case LocationReducerType.GET_EQUIPMENTS_BY_ROOM:
      const { roomId }: { roomId: string } = payload;
      return {
        ...state,
        equipments: state.rooms.find((r) => r.id === roomId)?.equipments ?? [],
      };
    default:
      return state;
  }
}
