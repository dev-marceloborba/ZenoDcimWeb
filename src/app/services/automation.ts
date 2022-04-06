import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "../store";
import { ApiResponse } from "../models/api-response";
import {
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
  }),
});

export const {
  useListPlcsQuery,
  useListModbusTagsQuery,
  useAddModbusTagMutation,
  useAddPlcMutation,
  useDeletePlcMutation,
  useDeleteModbusTagMutation,
} = automationApi;
