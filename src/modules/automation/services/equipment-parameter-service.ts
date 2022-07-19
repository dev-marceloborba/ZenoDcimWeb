import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  EquipmentParameterViewModel,
  EquipmentParameterModel,
  MultipleEquipmentParameterViewModel,
  MultipleEquipmentParameterModel,
  UpdateEquipmentParameterViewModel,
} from "modules/automation/models/automation-model";
import { RootState } from "modules/core/store";

export const equipmentParametersApi = createApi({
  reducerPath: "equipmentParametersApi",
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
    updateEquipmentParameter: builder.mutation<
      ApiResponseModel<EquipmentParameterModel>,
      UpdateEquipmentParameterViewModel
    >({
      query: (params) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/${params.id}`,
        method: "PUT",
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
    findEquipmentParametersByEquipmentId: builder.mutation<
      EquipmentParameterModel[],
      string
    >({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipmentParameterById/${id}`,
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
  useUpdateEquipmentParameterMutation,
  useDeleteEquipmentParameterMutation,
  useFindAllEquipmentParametersQuery,
  useFindEquipmentParameterByIdMutation,
  useFindEquipmentParametersByEquipmentIdMutation,
  useCreateMultipleEquipmentParametersMutation,
} = equipmentParametersApi;
