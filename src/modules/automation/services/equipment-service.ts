import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";

import { RootState } from "modules/core/store";
import {
  EquipmentModel,
  EquipmentViewModel,
  MultipleEquipmentsViewModel,
} from "../models/automation-model";
import { BuildingsModel } from "modules/datacenter/models/datacenter-model";

export const equipmentApi = createApi({
  reducerPath: "equipmentApi",
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
  tagTypes: ["EquipmentModel"],
  endpoints: (builder) => ({
    createEquipment: builder.mutation<
      ApiResponseModel<EquipmentModel>,
      EquipmentViewModel
    >({
      query: (newEquipment) => ({
        url: "v1/data-center/building/floor/room/equipment",
        method: "POST",
        body: newEquipment,
      }),
      invalidatesTags: ["EquipmentModel"],
    }),
    findAllEquipments: builder.query<EquipmentModel[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment",
      }),
      providesTags: ["EquipmentModel"],
    }),
    findAllEquipmentsDetailed: builder.query<EquipmentModel[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment",
      }),
      transformResponse: (data: any[]) => {
        const vet: any[] = [];
        data.forEach((equipment) => {
          vet.push({
            id: equipment.id,
            name: equipment.component,
            weight: equipment.weight,
            size: equipment.size,
            powerLimit: equipment.powerLimit,
            building: equipment.building?.name,
            floor: equipment.floor?.name,
            room: equipment.room?.name,
            createdAt: equipment.createdDate,
          });
        });
        return vet;
      },
      providesTags: ["EquipmentModel"],
    }),
    findEquipmentById: builder.mutation<EquipmentModel, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/${id}`,
        method: "GET",
      }),
    }),
    findEquipmentsByRoomId: builder.mutation<EquipmentModel[], string>({
      query: (id) => ({
        url: `v1/data-center/equipments-by-room/${id}`,
        method: "GET",
      }),
    }),
    deleteEquipment: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentModel"],
    }),
    createMultipleEquipments: builder.mutation<
      BuildingsModel,
      MultipleEquipmentsViewModel
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/multiple",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["EquipmentModel"],
    }),
  }),
});

export const {
  useCreateEquipmentMutation,
  useFindAllEquipmentsQuery,
  useFindAllEquipmentsDetailedQuery,
  useFindEquipmentsByRoomIdMutation,
  useCreateMultipleEquipmentsMutation,
  useDeleteEquipmentMutation,
  useFindEquipmentByIdMutation,
} = equipmentApi;
