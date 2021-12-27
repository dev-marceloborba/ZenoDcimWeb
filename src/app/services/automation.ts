import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ApiResponse } from "./api-response";

export interface PlcResponse extends PlcRequest {
  id: string;
  modbusTags?: ModbusTagResponse[];
}

export interface PlcRequest {
  name: string;
  manufactor: string;
  model: string;
  ipAddress: string;
  tcpPort: number;
  scan: number;
}

export type ModbusDataType = "Holding Register" | "Coil";

export interface ModbusTagResponse extends ModbusTagRequest {
  id: string;
}

export interface ModbusTagRequest {
  modbusDevice: string;
  address: number;
  size: number;
  dataType: ModbusDataType;
  name: string;
  deadband: number;
}

export const automationApi = createApi({
  reducerPath: "automationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
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
            method: 'DELETE'
        })
    })
  }),
});

export const {
  useListPlcsQuery,
  useListModbusTagsQuery,
  useAddModbusTagMutation,
  useAddPlcMutation,
  useDeletePlcMutation,
  useDeleteModbusTagMutation
} = automationApi;
