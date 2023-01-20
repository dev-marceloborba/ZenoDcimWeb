import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  AlarmRuleModel,
  AlarmRulesModel,
  AlarmRuleViewModel,
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
    findAlarmRulesByEquipmentId: builder.query<AlarmRulesModel, string>({
      query: (id) => ({
        url: `v1/data-center/alarm-rules/by-equipment/${id}`,
        method: "GET",
      }),
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
