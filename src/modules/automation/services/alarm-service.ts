import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import {
  AlarmStatisticsModel,
  AlarmStatisticsViewModel,
} from "modules/alarms/models/alarm-statistics.model";
import { RootState } from "modules/core/store";
import {
  AlarmFilterViewModel,
  AlarmModel,
  AlarmTableViewModel,
  AlarmViewModel,
  EAlarmType,
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
    findAllAlarms: builder.mutation<
      AlarmTableViewModel[],
      AlarmFilterViewModel
    >({
      query: (params) => ({
        url: "v1/alarms",
        params: {
          initialDate: params.initialDate?.toUTCString(),
          finalDate: params.finalDate?.toUTCString(),
          priority: params.priority,
          type: params.type,
        },
      }),
      transformResponse: (baseValue: AlarmModel[]) => {
        return baseValue.map<AlarmTableViewModel>((alarm) => {
          const fields = alarm.pathname
            ?.split("*")
            .map((x) => x.replaceAll("_", " "));
          return {
            ...alarm,
            building: fields[1],
            floor: fields[2],
            room: fields[3],
            equipment: fields[4],
            parameter: fields[5],
            ruleId: alarm.alarmRule.id,
            rule: alarm.alarmRule.name,
            acked: false,
            priority: alarm.alarmRule.priority,
            type:
              (alarm.type as EAlarmType) === EAlarmType.ALARM
                ? "Alarme"
                : "Evento",
          };
        });
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
    findAlarmStatistics: builder.mutation<
      AlarmStatisticsModel,
      AlarmStatisticsViewModel
    >({
      query: (params) => ({
        url: "v1/alarms/statistics",
        method: "GET",
        params: {
          initialDate: params.initialDate.toUTCString(),
          finalDate: params.finalDate.toUTCString(),
        },
      }),
    }),
  }),
});

export const {
  useDeleteAlarmMutation,
  useFindAlarmByIdMutation,
  useFindAllAlarmsMutation,
  useFindAlarmStatisticsMutation,
} = alarmApi;
