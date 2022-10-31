import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  CreateRackEquipmentViewModel,
  RackEquipmentModel,
  RackEquipmentsTableViewModel,
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
  tagTypes: ["RackEquipmentModel", "RackEquipmentsTableViewModel"],
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
      invalidatesTags: ["RackEquipmentModel", "RackEquipmentsTableViewModel"],
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
      invalidatesTags: ["RackEquipmentModel", "RackEquipmentsTableViewModel"],
    }),
    placeRackEquipment: builder.mutation<any, any>({
      query: (params) => ({
        url: `v1/rack-equipments/place-equipment/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["RackEquipmentModel", "RackEquipmentsTableViewModel"],
    }),
    findAllRackEquipments: builder.query<RackEquipmentsTableViewModel[], void>({
      query: (params) => ({
        url: "v1/rack-equipments",
        method: "GET",
      }),
      providesTags: ["RackEquipmentModel", "RackEquipmentsTableViewModel"],
      transformResponse: (response: RackEquipmentModel[]) => {
        return response.map<RackEquipmentsTableViewModel>((rack) => ({
          id: rack.id,
          name: rack.baseEquipment.name,
          model: rack.baseEquipment.model,
          manufactor: rack.baseEquipment.manufactor,
          serialNumber: rack.baseEquipment.serialNumber,
          size: rack.baseEquipment.size,
          initialPosition: rack.initialPosition,
          finalPosition: rack.finalPosition,
          rackEquipmentType: rack.rackEquipmentType,
        }));
      },
    }),
    findRackEquipmentById: builder.mutation<RackEquipmentModel, string>({
      query: (id) => ({
        url: `v1/rack-equipments/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["RackEquipmentModel", "RackEquipmentsTableViewModel"],
    }),
    findRackEquipmentsByRackId: builder.mutation<
      RackEquipmentsTableViewModel[],
      string
    >({
      query: (id) => ({
        url: `v1/rack-equipments/rack/${id}`,
        method: "GET",
      }),
      transformResponse: (response: RackEquipmentModel[]) => {
        return response.map<RackEquipmentsTableViewModel>((rack) => ({
          id: rack.id,
          name: rack.baseEquipment.name,
          model: rack.baseEquipment.model,
          manufactor: rack.baseEquipment.manufactor,
          serialNumber: rack.baseEquipment.serialNumber,
          size: rack.baseEquipment.size,
          initialPosition: rack.initialPosition,
          finalPosition: rack.finalPosition,
          rackEquipmentType: rack.rackEquipmentType,
        }));
      },
    }),
    findEquipmentsWithoutRack: builder.mutation<
      RackEquipmentsTableViewModel[],
      void
    >({
      query: () => ({
        url: "v1/rack-equipments/without-rack",
        method: "GET",
      }),
      transformResponse: (response: RackEquipmentModel[]) => {
        return response.map<RackEquipmentsTableViewModel>((rack) => ({
          id: rack.id,
          name: rack.baseEquipment.name,
          model: rack.baseEquipment.model,
          manufactor: rack.baseEquipment.manufactor,
          serialNumber: rack.baseEquipment.serialNumber,
          size: rack.baseEquipment.size,
          initialPosition: rack.initialPosition,
          finalPosition: rack.finalPosition,
          rackEquipmentType: rack.rackEquipmentType,
        }));
      },
    }),
    deleteRackEquipment: builder.mutation<RackEquipmentModel, string>({
      query: (id) => ({
        url: `v1/rack-equipments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RackEquipmentModel", "RackEquipmentsTableViewModel"],
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
