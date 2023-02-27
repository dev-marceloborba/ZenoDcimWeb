import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  CreateRackEquipmentViewModel,
  RackEquipmentModel,
  UpdateRackEquipmentViewModel,
} from "../models/rack-equipment.model";

export const rackEquipmentApi = createApi({
  reducerPath: "rackEquipmentApi",
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
  tagTypes: ["RackEquipmentModel"],
  endpoints: (builder) => ({
    createRackEquipment: builder.mutation<
      ApiResponseModel<RackEquipmentModel>,
      CreateRackEquipmentViewModel
    >({
      query: (params) => ({
        url: "v1/rack-equipments",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["RackEquipmentModel"],
    }),
    updateRackEquipment: builder.mutation<
      RackEquipmentModel,
      UpdateRackEquipmentViewModel
    >({
      query: (params) => ({
        url: `v1/rack-equipments/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["RackEquipmentModel"],
    }),
    placeRackEquipment: builder.mutation<any, any>({
      query: (params) => ({
        url: `v1/rack-equipments/place-equipment/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["RackEquipmentModel"],
    }),
    findAllRackEquipments: builder.query<RackEquipmentModel[], void>({
      query: (params) => ({
        url: "v1/rack-equipments",
        method: "GET",
      }),
      providesTags: ["RackEquipmentModel"],
    }),
    findRackEquipmentById: builder.mutation<RackEquipmentModel, string>({
      query: (id) => ({
        url: `v1/rack-equipments/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["RackEquipmentModel"],
    }),
    findRackEquipmentsByRackId: builder.mutation<RackEquipmentModel[], string>({
      query: (id) => ({
        url: `v1/rack-equipments/rack/${id}`,
        method: "GET",
      }),
    }),
    findEquipmentsWithoutRack: builder.mutation<RackEquipmentModel[], void>({
      query: () => ({
        url: "v1/rack-equipments/without-rack",
        method: "GET",
      }),
    }),
    deleteRackEquipment: builder.mutation<RackEquipmentModel, string>({
      query: (id) => ({
        url: `v1/rack-equipments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RackEquipmentModel"],
    }),
  }),
});

export const {
  useCreateRackEquipmentMutation,
  useDeleteRackEquipmentMutation,
  useFindAllRackEquipmentsQuery,
  useFindRackEquipmentByIdMutation,
  useUpdateRackEquipmentMutation,
  useFindRackEquipmentsByRackIdMutation,
  useFindEquipmentsWithoutRackMutation,
  usePlaceRackEquipmentMutation,
} = rackEquipmentApi;
