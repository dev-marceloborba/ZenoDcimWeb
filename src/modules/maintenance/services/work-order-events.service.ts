import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { WorkOrderEventModel } from "../models/work-order-event.model";

export const workOrderEventsApi = createApi({
  reducerPath: "workOrderEventsApi",
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
  tagTypes: ["WorkOrderEventModel"],
  endpoints: (builder) => ({
    findAllWorkOrderEvents: builder.query<WorkOrderEventModel[], void>({
      query: () => ({
        url: "v1/work-order-events",
        method: "GET",
      }),
      providesTags: ["WorkOrderEventModel"],
    }),
    findWorkOrderEventsById: builder.query<WorkOrderEventModel[], string>({
      query: (id) => ({
        url: `v1/work-order-events/${id}`,
        method: "GET",
      }),
      providesTags: ["WorkOrderEventModel"],
    }),
  }),
});

export const {
  useFindAllWorkOrderEventsQuery,
  useFindWorkOrderEventsByIdQuery,
} = workOrderEventsApi;
