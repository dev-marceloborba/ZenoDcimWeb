import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  BuildingMerged,
  BuildingViewModel,
  BuildingModel,
  BuildingsModel,
} from "modules/datacenter/models/datacenter-model";
import { RootState } from "modules/core/store";

export const buildingApi = createApi({
  reducerPath: "buildingApi",
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
  tagTypes: ["BuildingModel", "BuildingMerged"],
  endpoints: (builder) => ({
    createBuilding: builder.mutation<
      ApiResponseModel<BuildingModel>,
      BuildingViewModel
    >({
      query: (newBuilding) => ({
        url: "v1/data-center/building",
        method: "POST",
        body: newBuilding,
      }),
      invalidatesTags: ["BuildingModel", "BuildingMerged"],
    }),
    findAllBuildings: builder.query<BuildingsModel, void>({
      query: () => ({ url: "v1/data-center/building" }),
    }),
    findBuildingById: builder.mutation<BuildingModel, string>({
      query: (id) => ({ url: `v1/data-center/building/${id}`, method: "GET" }),
    }),
    findAllBuildingsDeep: builder.query<BuildingMerged[], void>({
      query: () => ({ url: "v1/data-center/building" }),
      transformResponse: (buildings: BuildingsModel) => {
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
      providesTags: ["BuildingModel", "BuildingMerged"],
    }),
    deleteBuilding: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BuildingModel", "BuildingMerged"],
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useDeleteBuildingMutation,
  useFindAllBuildingsDeepQuery,
  useFindAllBuildingsQuery,
  useFindBuildingByIdMutation,
} = buildingApi;
