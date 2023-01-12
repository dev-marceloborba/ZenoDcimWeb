import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { EEquipmentStatus } from "modules/automation/models/automation-model";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  CreateRackEquipmentViewModel,
  ERackEquipmentOrientation,
  ERackEquipmentType,
  RackEquipmentModel,
  RackEquipmentsTableViewModel,
  UpdateRackEquipmentViewModel,
} from "../models/rack-equipment.model";
import { ERackMount } from "../models/rack.model";

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
          ...rack,
          name: rack.baseEquipment.name,
          model: rack.baseEquipment.model,
          manufactor: rack.baseEquipment.manufactor,
          serialNumber: rack.baseEquipment.serialNumber,
        }));
      },
    }),
    findRackEquipmentById: builder.mutation<RackEquipmentModel, string>({
      query: (id) => ({
        url: `v1/rack-equipments/${id}`,
        method: "GET",
      }),
      transformResponse: (response: RackEquipmentModel) => {
        function getMountTypeDescription(mountType: ERackMount) {
          switch (mountType) {
            case ERackMount.BDJ_BACKSIDE:
              return "Bandeja, Backsided";
            case ERackMount.BDJ_FRONTSIDE:
              return "Bandeja, Frontsided";
            case ERackMount.LATERAL:
              return "Lateral";
            case ERackMount.NO_ONE:
              return "Nenhum";
            case ERackMount.RACK_19_BACKSIDE:
              return "Rack 19”, Backside";
            case ERackMount.RACK_19_FRONTSIDE:
              return "Rack 19”, Frontside";
            case ERackMount.RACK_19_BOTHSIDE:
              return "Rack 19”, Bothside";
            case ERackMount.WITH_ACESSORY_FRONTSIDE:
              return "Com acessório, Frontsided";
            case ERackMount.WITH_ACESSORY_BACKSIDE:
              return "Com acessório, Backsided";
          }
        }

        function getEquipmentOrientation(
          equipmentOrientation: ERackEquipmentOrientation
        ) {
          switch (equipmentOrientation) {
            case ERackEquipmentOrientation.BOTHSIDED:
              return "Bothsided";
            case ERackEquipmentOrientation.FRONTSIDED:
              return "Frontsided";
            case ERackEquipmentOrientation.BACKSIDED:
              return "Backsided";
          }
        }

        function getRackEquipmentType(rackEquipmentType: ERackEquipmentType) {
          switch (rackEquipmentType) {
            case ERackEquipmentType.SERVER:
              return "Servidor";
            case ERackEquipmentType.SWITCH:
              return "Switch";
            case ERackEquipmentType.STORAGE:
              return "Storage";
            case ERackEquipmentType.BACKUP_ROBOT:
              return "Robô de backup";
          }
        }

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
          rackMountType: getMountTypeDescription(
            response.rackMountType as ERackMount
          ),
          rackEquipmentOrientation: getEquipmentOrientation(
            response.rackEquipmentOrientation as ERackEquipmentOrientation
          ),
          rackEquipmentType: getRackEquipmentType(
            response.rackEquipmentType as ERackEquipmentType
          ),
          status: getEquipmentStatus(response.status as EEquipmentStatus),
        };
      },
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
          ...rack,
          name: rack.baseEquipment.name,
          model: rack.baseEquipment.model,
          manufactor: rack.baseEquipment.manufactor,
          serialNumber: rack.baseEquipment.serialNumber,
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
          ...rack,
          name: rack.baseEquipment.name,
          model: rack.baseEquipment.model,
          manufactor: rack.baseEquipment.manufactor,
          serialNumber: rack.baseEquipment.serialNumber,
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
