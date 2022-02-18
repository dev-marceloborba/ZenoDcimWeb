import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ApiResponse } from "./api-response";

export interface BuildingRequest {
  campus: string;
  name: string;
}

export interface BuildingResponse extends BuildingRequest {
  id: string;
}

export interface FloorRequest {
  building: BuildingRequest;
  name: string;
}

export interface FloorResponse extends FloorRequest {
  id: string;
}

export interface RoomRequest {
  floor: FloorRequest;
  name: string;
}

export interface RoomResponse extends RoomRequest {
  id: string;
}

export interface EquipmentRequest {
  room: RoomRequest;
  class: string;
  component: string;
  componentCode: string;
  description: string;
}

export interface EquipmentResponse extends EquipmentRequest {
  id: string;
}

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
    listBuildings: builder.query<BuildingResponse, void>({
      query: () => ({ url: "v1/data-center/building" }),
      transformResponse: (buildings: any) => {
        const rowsArray: any = [];

        buildings.forEach((building: any) => {
          building.floors.forEach((floor: any) => {
            floor.rooms.forEach((room: any) => {
              room.equipments.forEach((equipment: any) => {
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
    listFloor: builder.query<FloorResponse, void>({
      query: () => ({ url: "v1/data-center/building/floor" }),
    }),
    addRoom: builder.mutation<ApiResponse<RoomResponse>, RoomRequest>({
      query: (newRoom) => ({
        url: "v1/data-center/building/floor/room",
        method: "POST",
        body: newRoom,
      }),
    }),
    listRoom: builder.query<BuildingRequest, void>({
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
  useAddFloorMutation,
  useListFloorQuery,
  useAddRoomMutation,
  useListRoomQuery,
  useAddEquipmentMutation,
  useListEquipmentsQuery,
} = datacenterApi;
