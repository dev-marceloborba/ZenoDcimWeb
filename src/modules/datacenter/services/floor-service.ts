import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { DatacenterRootState } from "modules/datacenter/stores/datacenter-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  FloorViewModel,
  FloorModel,
} from "modules/datacenter/models/datacenter-model";

export const floorApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: environment,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as DatacenterRootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["FloorModel"],
  endpoints: (builder) => ({
    createFloor: builder.mutation<ApiResponseModel<FloorModel>, FloorViewModel>(
      {
        query: (newFloor) => ({
          url: "v1/data-center/building/floor",
          method: "POST",
          body: newFloor,
        }),
        invalidatesTags: ["FloorModel"],
      }
    ),
    findAllFloors: builder.query<FloorModel[], void>({
      query: () => ({ url: "v1/data-center/building/floor" }),
      providesTags: ["FloorModel"],
    }),
    deleteFloor: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FloorModel"],
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useDeleteFloorMutation,
  useFindAllFloorsQuery,
} = floorApi;
