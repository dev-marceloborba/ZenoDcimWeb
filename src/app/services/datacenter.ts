import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "../store";
import { ApiResponse } from "../models/api-response";
import {
  BuildingMerged,
  BuildingRequest,
  BuildingResponse,
  BuildingsResponse,
  EquipmentParameterGroupRequest,
  EquipmentParameterGroupResponse,
  EquipmentParameterRequest,
  EquipmentParameterResponse,
  EquipmentRequest,
  EquipmentResponse,
  FloorRequest,
  FloorResponse,
  MultipleEquipmentParameterRequest,
  MultipleEquipmentParameterResponse,
  MultipleEquipmentsRequest,
  ParameterRequest,
  ParameterResponse,
  RoomRequest,
  RoomResponse,
  SiteRequest,
  SiteResponse,
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
    addSite: builder.mutation<ApiResponse<SiteResponse>, SiteRequest>({
      query: (params) => ({
        url: "v1/data-center/site",
        method: "POST",
        data: params,
      }),
    }),
    listSites: builder.query<SiteResponse[], void>({
      query: () => ({ url: "v1/data-center/site" }),
    }),
    deleteSite: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/site/${id}`,
        method: "DELETE",
      }),
    }),
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
    findRoomById: builder.mutation<RoomResponse, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/${id}`,
        method: "GET",
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
    findEquipmentParametersByEquipmentId: builder.mutation<
      EquipmentParameterResponse[],
      string
    >({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipmentParameterById/${id}`,
        method: "GET",
      }),
    }),
    listAllEquipments: builder.query<EquipmentResponse[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment",
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
    deleteEquipmentParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/${id}`,
        method: "DELETE",
      }),
    }),
    createMultipleEquipmentParameters: builder.mutation<
      MultipleEquipmentParameterResponse,
      MultipleEquipmentParameterRequest
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter/multiple",
        method: "POST",
        body: params,
      }),
    }),
    createEquipmentParameterGroup: builder.mutation<
      EquipmentParameterGroupResponse,
      EquipmentParameterGroupRequest
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter/group",
        method: "POST",
        body: params,
      }),
    }),
    listAllParameterGroups: builder.query<
      EquipmentParameterGroupResponse[],
      void
    >({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment/parameter/group",
      }),
    }),
    listAllEquipmentParameters: builder.query<
      EquipmentParameterResponse[],
      void
    >({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment/parameters",
      }),
    }),
    listAllParameters: builder.query<ParameterResponse[], void>({
      query: () => ({
        url: "v1/data-center/parameters",
      }),
    }),
    createParameter: builder.mutation<
      ApiResponse<ParameterResponse>,
      ParameterRequest
    >({
      query: (params) => ({
        url: "v1/data-center/parameters",
        method: "POST",
        body: params,
      }),
    }),
    deleteParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/parameters/${id}`,
        method: "DELETE",
      }),
    }),
    findParameterByGroup: builder.mutation<void, string>({
      query: (group) => ({
        url: `v1/data-center/parametersByGroup/${group}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddSiteMutation,
  useListSitesQuery,
  useDeleteSiteMutation,
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
  useDeleteEquipmentMutation,
  useFindEquipmentByIdMutation,
  useFindBuildingByIdMutation,
  useAddMultipleEquipmentsMutation,
  useFindEquipmentParameterByIdMutation,
  useCreateEquipmentParameterMutation,
  useListAllEquipmentsQuery,
  useCreateMultipleEquipmentParametersMutation,
  useCreateEquipmentParameterGroupMutation,
  useListAllParameterGroupsQuery,
  useListAllEquipmentParametersQuery,
  useListAllParametersQuery,
  useCreateParameterMutation,
  useDeleteParameterMutation,
  useDeleteEquipmentParameterMutation,
  useFindParameterByGroupMutation,
  useFindEquipmentParametersByEquipmentIdMutation,
  useFindRoomByIdMutation,
} = datacenterApi;
