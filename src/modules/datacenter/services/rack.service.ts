import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { OccupationModel } from "../models/occupation.model";
import {
  CreateRackViewModel,
  RackModel,
  RackStatistcsModel,
  UpdateRackViewModel,
} from "../models/rack.model";

export const rackApi = createApi({
  reducerPath: "rackApi",
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
  tagTypes: ["RackModel"],
  endpoints: (builder) => ({
    createRack: builder.mutation<
      ApiResponseModel<RackModel>,
      CreateRackViewModel
    >({
      query: (params) => ({
        url: "v1/racks",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["RackModel"],
    }),
    updateRack: builder.mutation<RackModel, UpdateRackViewModel>({
      query: (params) => ({
        url: `v1/racks/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["RackModel"],
    }),
    findAllRacks: builder.query<RackModel[], void>({
      query: () => ({
        url: "v1/racks",
        method: "GET",
      }),
      providesTags: ["RackModel"],
    }),
    findRackById: builder.query<RackModel, string>({
      query: (id) => ({
        url: `v1/racks/${id}`,
        method: "GET",
      }),
      providesTags: ["RackModel"],
    }),
    deleteRack: builder.mutation<RackModel, string>({
      query: (id) => ({
        url: `v1/racks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RackModel"],
    }),
    findRackStatistcs: builder.mutation<RackStatistcsModel, string>({
      query: (id) => ({
        url: `v1/racks/statistics/${id}`,
        method: "GET",
      }),
    }),
    loadOccupationCard: builder.mutation<OccupationModel[], string>({
      query: (roomId) => ({
        url: `v1/racks/occupation-card/${roomId}`,
        method: "GET"
      })
    }),
  }),
});

export const {
  useCreateRackMutation,
  useDeleteRackMutation,
  useFindAllRacksQuery,
  useFindRackByIdQuery,
  useUpdateRackMutation,
  useFindRackStatistcsMutation,
  useLoadOccupationCardMutation
} = rackApi;
