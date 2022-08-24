import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { AlarmModel, AlarmViewModel } from "../models/alarm-model";

export const alarmApi = createApi({
  reducerPath: "alarmApi",
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
  tagTypes: ["AlarmModel"],
  endpoints: (builder) => ({
    findAllAlarms: builder.mutation<AlarmModel[], AlarmViewModel>({
      query: (params) => ({
        url: "v1/alarms",
        params: {
          initialDate: params.initialDate?.toUTCString(),
          finalDate: params.finalDate?.toUTCString(),
        },
      }),
      invalidatesTags: ["AlarmModel"],
    }),
    findAlarmById: builder.mutation<AlarmModel, string>({
      query: (id) => ({
        url: `v1/alarms/${id}`,
        method: "GET",
      }),
    }),
    deleteAlarm: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/alarms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AlarmModel"],
    }),
  }),
});

export const {
  useDeleteAlarmMutation,
  useFindAlarmByIdMutation,
  useFindAllAlarmsMutation,
} = alarmApi;
