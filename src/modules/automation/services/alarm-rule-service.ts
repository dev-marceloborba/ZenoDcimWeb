import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  AlarmRuleModel,
  AlarmRulesModel,
  AlarmRuleTableViewModel,
  AlarmRuleViewModel,
  EAlarmConditonal,
  EAlarmPriority,
  UpdateAlarmRuleViewModel,
} from "../models/alarm-rule-model";

export const alarmRuleApi = createApi({
  reducerPath: "alarmRuleApi",
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
  tagTypes: ["AlarmRuleModel"],
  endpoints: (builder) => ({
    createAlarmRule: builder.mutation<
      ApiResponseModel<AlarmRuleModel>,
      AlarmRuleViewModel
    >({
      query: (params) => ({
        url: "v1/data-center/alarm-rules",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["AlarmRuleModel"],
    }),
    updateAlarmRule: builder.mutation<
      ApiResponseModel<AlarmRuleModel>,
      UpdateAlarmRuleViewModel
    >({
      query: (params) => ({
        url: `v1/data-center/alarm-rules/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["AlarmRuleModel"],
    }),
    findAllAlarmRules: builder.query<AlarmRulesModel, void>({
      query: () => ({
        url: "v1/data-center/alarm-rules",
      }),
      providesTags: ["AlarmRuleModel"],
    }),
    findAlarmRuleById: builder.mutation<AlarmRuleModel, string>({
      query: (id) => ({
        url: `v1/data-center/alarm-rules/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["AlarmRuleModel"],
    }),
    findAlarmRulesByEquipmentId: builder.query<
      AlarmRuleTableViewModel[],
      string
    >({
      query: (id) => ({
        url: `v1/data-center/alarm-rules/by-equipment/${id}`,
        method: "GET",
      }),
      transformResponse: (response: AlarmRulesModel) => {
        function getRuleConditional(conditional: EAlarmConditonal) {
          switch (conditional) {
            case EAlarmConditonal.EQUAL:
              return "=";
            case EAlarmConditonal.GREATER:
              return ">";
            case EAlarmConditonal.GREATER_EQUAL:
              return ">=";
            case EAlarmConditonal.LOWER:
              return "<";
            case EAlarmConditonal.LOWER_EQUAL:
              return "<=";
          }
        }

        function getRulePriority(priority: EAlarmPriority) {
          switch (priority) {
            case EAlarmPriority.MEDIUM:
              return "Média";
            case EAlarmPriority.HIGH:
              return "Alta";
            case EAlarmPriority.LOW:
              return "Baixa";
          }
        }

        return response.map((x) => ({
          name: x.name,
          setpoint: x.setpoint,
          enableEmail: x.enableEmail,
          equipmentParameter: x.equipmentParameter,
          enableNotification: x.enableNotification,
          conditional: getRuleConditional(x.conditional),
          priority: getRulePriority(x.priority),
        }));
      },
      providesTags: ["AlarmRuleModel"],
    }),
    deleteAlarmRule: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/alarm-rules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AlarmRuleModel"],
    }),
  }),
});

export const {
  useCreateAlarmRuleMutation,
  useDeleteAlarmRuleMutation,
  useFindAlarmRuleByIdMutation,
  useFindAllAlarmRulesQuery,
  useFindAlarmRulesByEquipmentIdQuery,
  useUpdateAlarmRuleMutation,
} = alarmRuleApi;
