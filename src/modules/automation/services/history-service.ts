import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import {
  MeasureHistoryViewModel,
  MeasuresHistoryModel,
} from "../models/measure-history-model";

export const historyApi = createApi({
  reducerPath: "historyApi",
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
    findAllMeasures: builder.mutation<
      MeasuresHistoryModel,
      MeasureHistoryViewModel
    >({
      query: (params) => ({
        url: "v1/measures",
        params: {
          initialDate: params.initialDate?.toUTCString(),
          finalDate: params.finalDate?.toUTCString(),
        },
      }),
    }),
    findAllMeasuresByEquipment: builder.mutation<MeasuresHistoryModel, string>({
      query: (id) => ({
        url: `v1/measures/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFindAllMeasuresMutation,
  useFindAllMeasuresByEquipmentMutation,
} = historyApi;
