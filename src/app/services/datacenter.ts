import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ApiResponse } from "./api-response";
import { RackEquipmentResponse } from "./rack";

export type BuildingRequest = {
  campus: string;
  name: string;
};

export interface BuildingResponse extends BuildingRequest {
  id: string;
  floors?: FloorResponse[];
}

export type BuildingsResponse = BuildingResponse[];

export interface FloorRequest {
  buildingId: string;
  name: string;
}

export interface FloorResponse extends FloorRequest {
  id: string;
  rooms?: RoomResponse[];
}

export interface RoomRequest {
  buildingId: string;
  floorId: string;
  name: string;
}

export interface RoomResponse extends RoomRequest {
  id: string;
  equipments?: RackEquipmentResponse[];
}

export interface EquipmentRequest {
  buildingId: string;
  floorId: string;
  roomId: string;
  class: string;
  component: string;
  componentCode: string;
  description: string;
}

export interface EquipmentResponse extends EquipmentRequest {
  id: string;
}

export type BuildingMerged = {
  class: string;
  component: string;
  componentCode: string;
  description: string;
  building: string;
  floor: string;
  room: string;
};

export const datacenterApi = createApi({
  reducerPath: "datacenterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addBuilding: builder.mutation<
      ApiResponse<BuildingResponse>,
      BuildingRequest
    >({
      query: (newBuilding) => ({
        url: "v1/data-center/building",
        method: "POST",
        body: newBuilding,
      }),
    }),
    listBuildings: builder.query<BuildingsResponse, void>({
      query: () => ({ url: "v1/data-center/building" }),
    }),
    findBuildingById: builder.mutation<BuildingResponse, string>({
      query: (id) => ({ url: `v1/data-center/building/${id}`, method: "GET" }),
    }),
    listBuildingsDeep: builder.query<BuildingMerged[], void>({
      query: () => ({ url: "v1/data-center/building" }),
      transformResponse: (buildings: BuildingsResponse) => {
        const rowsArray: BuildingMerged[] = [];

        buildings.forEach((building) => {
          building.floors?.forEach((floor) => {
            floor.rooms?.forEach((room) => {
              room.equipments?.forEach((equipment: any) => {
                rowsArray.push({
                  class: equipment.class,
                  component: equipment.component,
                  componentCode: equipment.componentCode,
                  description: equipment.description,
                  building: building.name,
                  floor: floor.name,
                  room: room.name,
                });
              });
            });
          });
        });

        return rowsArray;
      },
    }),
    addFloor: builder.mutation<ApiResponse<FloorResponse>, FloorRequest>({
      query: (newFloor) => ({
        url: "v1/data-center/building/floor",
        method: "POST",
        body: newFloor,
      }),
    }),
    listFloor: builder.query<FloorResponse[], void>({
      query: () => ({ url: "v1/data-center/building/floor" }),
    }),
    addRoom: builder.mutation<ApiResponse<RoomResponse>, RoomRequest>({
      query: (newRoom) => ({
        url: "v1/data-center/building/floor/room",
        method: "POST",
        body: newRoom,
      }),
    }),
    listRoom: builder.query<RoomResponse[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room",
      }),
    }),
    addEquipment: builder.mutation<
      ApiResponse<EquipmentResponse>,
      EquipmentRequest
    >({
      query: (newEquipment) => ({
        url: "v1/data-center/building/floor/room/equipment",
        method: "POST",
        body: newEquipment,
      }),
    }),
    listEquipments: builder.query({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment",
      }),
    }),
  }),
});

export const {
  useAddBuildingMutation,
  useListBuildingsQuery,
  useListBuildingsDeepQuery,
  useAddFloorMutation,
  useListFloorQuery,
  useAddRoomMutation,
  useListRoomQuery,
  useAddEquipmentMutation,
  useListEquipmentsQuery,
  useFindBuildingByIdMutation,
} = datacenterApi;
