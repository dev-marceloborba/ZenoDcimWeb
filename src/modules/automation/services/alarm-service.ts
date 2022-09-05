import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import {
  AlarmModel,
  AlarmTableViewModel,
  AlarmViewModel,
} from "../models/alarm-model";

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
    findAllAlarms: builder.mutation<AlarmTableViewModel[], AlarmViewModel>({
      query: (params) => ({
        url: "v1/alarms",
        params: {
          initialDate: params.initialDate?.toUTCString(),
          finalDate: params.finalDate?.toUTCString(),
        },
      }),
      transformResponse: (baseValue: AlarmModel[]) => {
        const values: AlarmTableViewModel[] = [];
        baseValue.forEach((alarm) => {
          const fields = alarm.pathname
            ?.split("*")
            .map((x) => x.replaceAll("_", " "));
          values.push({
            id: alarm.id,
            building: fields[1],
            floor: fields[2],
            room: fields[3],
            equipment: fields[4],
            parameter: fields[5],
            acked: false,
            rule: alarm.alarmRule.name,
            value: alarm.value,
            inDate: alarm.inDate,
            outDate: alarm.outDate,
            ruleId: alarm.alarmRule.id,
            status: alarm.status,
          });
        });
        return values;
      },
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
