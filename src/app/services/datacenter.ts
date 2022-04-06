import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "../store";
import { ApiResponse } from "../models/api-response";
import {
  BuildingMerged,
  BuildingRequest,
  BuildingResponse,
  BuildingsResponse,
  EquipmentParameterRequest,
  EquipmentParameterResponse,
  EquipmentRequest,
  EquipmentResponse,
  FloorRequest,
  FloorResponse,
  MultipleEquipmentsRequest,
  RoomRequest,
  RoomResponse,
} from "app/models/data-center.model";

export const datacenterApi = createApi({
  reducerPath: "datacenterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: environment,
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
    deleteBuilding: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/${id}`,
        method: "DELETE",
      }),
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
    deleteFloor: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/${id}`,
        method: "DELETE",
      }),
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
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/${id}`,
        method: "DELETE",
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
    listEquipments: builder.query<EquipmentResponse[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment",
      }),
    }),
    deleteEquipment: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/${id}`,
        method: "DELETE",
      }),
    }),
    findEquipmentById: builder.mutation<EquipmentResponse, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/${id}`,
        method: "GET",
      }),
    }),
    addMultipleEquipments: builder.mutation<
      BuildingsResponse,
      MultipleEquipmentsRequest
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/multiple",
        method: "POST",
        body: params,
      }),
    }),
    findEquipmentParameterById: builder.mutation<
      EquipmentParameterResponse,
      string
    >({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/${id}`,
        method: "GET",
      }),
    }),
    createEquipmentParameter: builder.mutation<
      EquipmentParameterResponse,
      EquipmentParameterRequest
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useAddBuildingMutation,
  useListBuildingsQuery,
  useListBuildingsDeepQuery,
  useDeleteBuildingMutation,
  useAddFloorMutation,
  useListFloorQuery,
  useDeleteFloorMutation,
  useAddRoomMutation,
  useListRoomQuery,
  useDeleteRoomMutation,
  useAddEquipmentMutation,
  useListEquipmentsQuery,
  useDeleteEquipmentMutation,
  useFindEquipmentByIdMutation,
  useFindBuildingByIdMutation,
  useAddMultipleEquipmentsMutation,
  useFindEquipmentParameterByIdMutation,
  useCreateEquipmentParameterMutation,
} = datacenterApi;
