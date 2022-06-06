import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { AutomationRootState } from "modules/automation/stores/automation-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  EquipmentParameterViewModel,
  EquipmentParameterModel,
  MultipleEquipmentParameterViewModel,
  MultipleEquipmentParameterModel,
} from "modules/automation/models/automation-model";

export const equipmentParametersApi = createApi({
  reducerPath: "equipmentParametersApi",
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
  tagTypes: ["EquipmentParameterModel"],
  endpoints: (builder) => ({
    createEquipmentParameter: builder.mutation<
      ApiResponseModel<EquipmentParameterModel>,
      EquipmentParameterViewModel
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["EquipmentParameterModel"],
    }),
    findAllEquipmentParameters: builder.query<EquipmentParameterModel[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment/parameters",
      }),
      providesTags: ["EquipmentParameterModel"],
    }),
    findEquipmentParameterById: builder.mutation<
      EquipmentParameterModel,
      string
    >({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/${id}`,
        method: "GET",
      }),
    }),
    deleteEquipmentParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentParameterModel"],
    }),
    createMultipleEquipmentParameters: builder.mutation<
      MultipleEquipmentParameterModel,
      MultipleEquipmentParameterViewModel
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter/multiple",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useCreateEquipmentParameterMutation,
  useDeleteEquipmentParameterMutation,
  useFindAllEquipmentParametersQuery,
  useFindEquipmentParameterByIdMutation,
  useCreateMultipleEquipmentParametersMutation,
} = equipmentParametersApi;
