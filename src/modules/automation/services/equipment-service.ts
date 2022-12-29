import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";

import { RootState } from "modules/core/store";
import {
  EEquipmentStatus,
  EquipmentModel,
  EquipmentViewModel,
  MultipleEquipmentsViewModel,
  UpdateEquipmentViewModel,
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
    findEquipmentByIdQuery: builder.query<EquipmentModel, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/${id}`,
        method: "GET",
      }),
      transformResponse: (response: EquipmentModel) => {
        function getEquipmentStatus(status: EEquipmentStatus) {
          switch (status) {
            case EEquipmentStatus.ARCHIVED:
              return "Arquivado";
            case EEquipmentStatus.INSTALLED:
              return "Instalado";
            case EEquipmentStatus.OFF_SITE:
              return "Fora da planta";
            case EEquipmentStatus.PLANNED:
              return "Planejado";
            case EEquipmentStatus.POWERED_OFF:
              return "Desligado";
            case EEquipmentStatus.STORAGE:
              return "Armazenado";
          }
        }
        return {
          ...response,
          status: getEquipmentStatus(response.status as EEquipmentStatus),
        };
      },
      providesTags: ["EquipmentModel"],
    }),
    findEquipmentsByRoomId: builder.mutation<EquipmentModel[], string>({
      query: (id) => ({
        url: `v1/data-center/equipments-by-room/${id}`,
        method: "GET",
      }),
    }),
    updateEquipment: builder.mutation<any, UpdateEquipmentViewModel>({
      query: (data) => ({
        url: `v1/data-center/building/floor/room/equipment/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EquipmentModel"],
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
  useUpdateEquipmentMutation,
  useFindEquipmentByIdMutation,
  useFindEquipmentByIdQueryQuery,
} = equipmentApi;
