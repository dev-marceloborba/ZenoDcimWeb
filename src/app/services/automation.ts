import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "../store";
import { ApiResponse } from "../models/api-response";
import {
  AlarmRequest,
  AlarmResponse,
  ModbusTagRequest,
  ModbusTagResponse,
  PlcRequest,
  PlcResponse,
} from "app/models/automation.model";

export const automationApi = createApi({
  reducerPath: "automationApi",
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
  endpoints: (builder) => ({
    listPlcs: builder.query<PlcResponse, void>({
      query: () => ({ url: "v1/plcs" }),
    }),
    addPlc: builder.mutation<ApiResponse<PlcResponse>, PlcRequest>({
      query: (newPlc) => ({
        url: "v1/plcs",
        method: "POST",
        body: newPlc,
      }),
    }),
    deletePlc: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `v1/plcs/${id}`,
        method: "DELETE",
      }),
    }),
    listModbusTags: builder.query<ModbusTagResponse[], void>({
      query: () => ({ url: "v1/modbusTags" }),
    }),
    addModbusTag: builder.mutation<
      ApiResponse<ModbusTagResponse>,
      ModbusTagRequest
    >({
      query: (newModbusTag) => ({
        url: "v1/modbusTags",
        method: "POST",
        body: newModbusTag,
      }),
    }),
    deleteModbusTag: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `v1/modbusTags/${id}`,
        method: "DELETE",
      }),
    }),
    createAlarm: builder.mutation<ApiResponse<AlarmResponse>, AlarmRequest>({
      query: (data) => ({
        url: "v1/alarms",
        method: "POST",
        body: data,
      }),
    }),
    findAllAlarms: builder.query<AlarmResponse[], void>({
      query: () => ({ url: "v1/alarms" }),
    }),
    findAlarmById: builder.query<AlarmResponse, string>({
      query: (id) => ({ url: `v1/alarms/${id}`, method: "GET" }),
    }),
    deleteAlarm: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `v1/alarms/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useListPlcsQuery,
  useListModbusTagsQuery,
  useAddModbusTagMutation,
  useAddPlcMutation,
  useDeletePlcMutation,
  useDeleteModbusTagMutation,
  useCreateAlarmMutation,
  useFindAllAlarmsQuery,
  useFindAlarmByIdQuery,
  useDeleteAlarmMutation,
} = automationApi;
