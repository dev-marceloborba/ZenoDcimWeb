import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import {
  BaseEquipmentRequest,
  BaseEquipmentResponse,
  ERackEquipmentType,
  RackEquipmentMerged,
  RackEquipmentRequest,
  RackEquipmentResponse,
  RackRequest,
  RackResponse,
  RacksResponse,
} from "app/models/rack.model";
import { RootState } from "modules/core/store";
import { ApiResponse } from "../models/api-response";

function getEquipmentDescription(
  rackEquipmentType: ERackEquipmentType
): string {
  switch (rackEquipmentType) {
    case ERackEquipmentType.STORAGE:
      return "Storage";
    case ERackEquipmentType.SWITCH:
      return "Switch";
    case ERackEquipmentType.SERVER:
      return "Servidor";
    case ERackEquipmentType.BACKUP_ROBOT:
      return "Backup";
    default:
      return "Desconhecido";
  }
}

export const rackApi = createApi({
  reducerPath: "racksApi",
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
  tagTypes: ["RackResponse"],
  endpoints: (builder) => ({
    findAllRacks: builder.query<RackEquipmentMerged[], void>({
      query: () => ({ url: "v1/racks" }),
      transformResponse: (response: RacksResponse) => {
        const rowsArray: RackEquipmentMerged[] = [];
        response.forEach((rack) => {
          if (rack.rackEquipments?.length) {
            rack.rackEquipments?.forEach((equipment) => {
              rowsArray.push({
                rackId: rack.id,
                size: rack.size + " U",
                localization: rack.localization,
                equipmentType: getEquipmentDescription(
                  equipment.rackEquipmentType
                ),
                name: equipment.baseEquipment.name,
                model: equipment.baseEquipment.model,
                manufactor: equipment.baseEquipment.manufactor,
                serialNumber: equipment.baseEquipment.serialNumber,
                initialPosition: equipment.initialPosition,
                finalPosition: equipment.finalPosition,
              });
            });
          } else {
            rowsArray.push({
              rackId: rack.id,
              size: rack.size + " U",
              localization: rack.localization,
            });
          }
        });

        return rowsArray;
      },
    }),
    createRack: builder.mutation<ApiResponse<RackResponse>, RackRequest>({
      query: (rack) => ({
        url: "v1/racks",
        method: "POST",
        body: rack,
      }),
    }),
    createBaseEquipment: builder.mutation<
      ApiResponse<BaseEquipmentResponse>,
      BaseEquipmentRequest
    >({
      query: (equipment) => ({
        url: "v1/racks/equipments",
        method: "POST",
        body: equipment,
      }),
    }),
    findAllRackEquipments: builder.query<RackEquipmentResponse, void>({
      query: () => ({
        url: "v1/racks/rackEquipments",
        method: "GET",
      }),
    }),
    createRackEquipment: builder.mutation<
      ApiResponse<RackEquipmentResponse>,
      RackEquipmentRequest
    >({
      query: (rackEquipment) => ({
        url: "v1/racks/rackEquipments",
        method: "POST",
        body: rackEquipment,
      }),
    }),
  }),
});

export const {
  useFindAllRacksQuery,
  useCreateRackMutation,
  useFindAllRackEquipmentsQuery,
} = rackApi;
