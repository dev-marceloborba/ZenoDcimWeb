import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "../store";
import { ApiResponse } from "../models/api-response";
import {
  EquipmentParameterRequest,
  EquipmentParameterResponse,
  MultipleEquipmentParameterRequest,
  MultipleEquipmentParameterResponse,
} from "app/models/data-center.model";

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
  tagTypes: ["EquipmentParameterResponse"],
  endpoints: (builder) => ({
    createEquipmentParameter: builder.mutation<
      ApiResponse<EquipmentParameterResponse>,
      EquipmentParameterRequest
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["EquipmentParameterResponse"],
    }),
    findAllEquipmentParameters: builder.query<
      EquipmentParameterResponse[],
      void
    >({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment/parameters",
      }),
      providesTags: ["EquipmentParameterResponse"],
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
    deleteEquipmentParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentParameterResponse"],
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
  }),
});

export const {
  useCreateEquipmentParameterMutation,
  useDeleteEquipmentParameterMutation,
  useFindAllEquipmentParametersQuery,
  useFindEquipmentParameterByIdMutation,
  useCreateMultipleEquipmentParametersMutation,
} = equipmentParametersApi;
