import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { AutomationRootState } from "modules/automation/stores/automation-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  BuildingsResponse,
  EquipmentRequest,
  EquipmentResponse,
  MultipleEquipmentsRequest,
} from "app/models/data-center.model";

export const equipmentApi = createApi({
  reducerPath: "equipmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: environment,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AutomationRootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["EquipmentResponse"],
  endpoints: (builder) => ({
    createEquipment: builder.mutation<
      ApiResponseModel<EquipmentResponse>,
      EquipmentRequest
    >({
      query: (newEquipment) => ({
        url: "v1/data-center/building/floor/room/equipment",
        method: "POST",
        body: newEquipment,
      }),
      invalidatesTags: ["EquipmentResponse"],
    }),
    findAllEquipments: builder.query<EquipmentResponse[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment",
      }),
      providesTags: ["EquipmentResponse"],
    }),
    findEquipmentById: builder.mutation<EquipmentResponse, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/${id}`,
        method: "GET",
      }),
    }),
    deleteEquipment: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentResponse"],
    }),
    createMultipleEquipments: builder.mutation<
      BuildingsResponse,
      MultipleEquipmentsRequest
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/multiple",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["EquipmentResponse"],
    }),
  }),
});

export const {
  useCreateEquipmentMutation,
  useFindAllEquipmentsQuery,
  useCreateMultipleEquipmentsMutation,
  useDeleteEquipmentMutation,
  useFindEquipmentByIdMutation,
} = equipmentApi;
