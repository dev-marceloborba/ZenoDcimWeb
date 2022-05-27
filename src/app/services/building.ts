import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "../store";
import { ApiResponse } from "../models/api-response";
import {
  BuildingMerged,
  BuildingRequest,
  BuildingResponse,
  BuildingsResponse,
} from "app/models/data-center.model";

export const buldingApi = createApi({
  reducerPath: "buldingApi",
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
  tagTypes: ["BuildingResponse", "BuildingMerged"],
  endpoints: (builder) => ({
    createBuilding: builder.mutation<
      ApiResponse<BuildingResponse>,
      BuildingRequest
    >({
      query: (newBuilding) => ({
        url: "v1/data-center/building",
        method: "POST",
        body: newBuilding,
      }),
      invalidatesTags: ["BuildingResponse", "BuildingMerged"],
    }),
    findAllBuildings: builder.query<BuildingsResponse, void>({
      query: () => ({ url: "v1/data-center/building" }),
    }),
    findBuildingById: builder.mutation<BuildingResponse, string>({
      query: (id) => ({ url: `v1/data-center/building/${id}`, method: "GET" }),
    }),
    findAllBuildingsDeep: builder.query<BuildingMerged[], void>({
      query: () => ({ url: "v1/data-center/building" }),
      transformResponse: (buildings: BuildingsResponse) => {
        const rowsArray: BuildingMerged[] = [];

        buildings.forEach((building) => {
          building.floors?.forEach((floor) => {
            floor.rooms?.forEach((room) => {
              room.equipments?.forEach((equipment: any) => {
                rowsArray.push({
                  class: equipment.class,
                  component: equipment.component,
                  componentCode: equipment.componentCode,
                  description: equipment.description,
                  building: building.name,
                  floor: floor.name,
                  room: room.name,
                });
              });
            });
          });
        });
        return rowsArray;
      },
      providesTags: ["BuildingResponse", "BuildingMerged"],
    }),
    deleteBuilding: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BuildingResponse", "BuildingMerged"],
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useDeleteBuildingMutation,
  useFindAllBuildingsDeepQuery,
  useFindAllBuildingsQuery,
  useFindBuildingByIdMutation,
} = buldingApi;
