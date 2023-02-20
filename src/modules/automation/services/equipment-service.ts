import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";

import { RootState } from "modules/core/store";
import {
  EquipmentModel,
  EquipmentViewModel,
  MultipleEquipmentsViewModel,
  UpdateEquipmentViewModel,
} from "../models/automation-model";
import { BuildingsModel } from "modules/datacenter/models/datacenter-model";
import getDateFormat from "modules/utils/helpers/getDateFormat";

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
      transformResponse: (baseValue: EquipmentModel[]) => {
        return baseValue.map((equipment) => ({
          ...equipment,
          createdDate: getDateFormat(equipment.createdDate),
        }));
      },
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
  useFindEquipmentsByRoomIdMutation,
  useCreateMultipleEquipmentsMutation,
  useDeleteEquipmentMutation,
  useUpdateEquipmentMutation,
  useFindEquipmentByIdMutation,
  useFindEquipmentByIdQueryQuery,
} = equipmentApi;
