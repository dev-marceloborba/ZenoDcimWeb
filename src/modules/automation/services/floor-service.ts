import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/automation/stores/automation-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { FloorRequest, FloorResponse } from "app/models/data-center.model";

export const floorApi = createApi({
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
  tagTypes: ["FloorResponse"],
  endpoints: (builder) => ({
    createFloor: builder.mutation<
      ApiResponseModel<FloorResponse>,
      FloorRequest
    >({
      query: (newFloor) => ({
        url: "v1/data-center/building/floor",
        method: "POST",
        body: newFloor,
      }),
      invalidatesTags: ["FloorResponse"],
    }),
    findAllFloors: builder.query<FloorResponse[], void>({
      query: () => ({ url: "v1/data-center/building/floor" }),
      providesTags: ["FloorResponse"],
    }),
    deleteFloor: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FloorResponse"],
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useDeleteFloorMutation,
  useFindAllFloorsQuery,
} = floorApi;
