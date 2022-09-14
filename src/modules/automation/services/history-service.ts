import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import splitPathnameIntoFields from "modules/utils/helpers/splitPathnameIntoFields";
import {
  MeasureHistoryViewModel,
  MeasuresHistoryModel,
  MeasureStatisticsModel,
  MeasureStatisticsViewModel,
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
      query: (params) => {
        return {
          url: "v1/measures",
          params: {
            initialDate: params.initialDate?.toUTCString(),
            finalDate: params.finalDate?.toUTCString(),
          },
        };
      },
    }),
    findMeasuresByParameter: builder.mutation<
      MeasuresHistoryModel,
      MeasureHistoryViewModel
    >({
      query: (params) => {
        console.log(params.initialDate?.toUTCString());
        return {
          url: "v1/measures/by-parameter",
          method: "GET",
          params: {
            parameter: params.parameter ?? "",
            initialDate: params.initialDate?.toUTCString(),
            finalDate: params.finalDate?.toUTCString(),
          },
        };
      },
      transformResponse: (baseValue: MeasuresHistoryModel) => {
        const output: MeasuresHistoryModel = [];
        baseValue.forEach((value) => {
          const ds = splitPathnameIntoFields(value.name!);
          output.push({
            building: ds.building,
            equipment: ds.equipment,
            floor: ds.floor,
            room: ds.room,
            site: ds.site,
            timestamp: value.timestamp,
            parameter: ds.parameter,
            value: value.value,
          });
        });
        return output;
      },
    }),
    findAllMeasuresByEquipment: builder.mutation<MeasuresHistoryModel, string>({
      query: (id) => ({
        url: `v1/measures/${id}`,
        method: "GET",
      }),
    }),
    findMeasureStatistics: builder.mutation<
      MeasureStatisticsModel,
      MeasureStatisticsViewModel
    >({
      query: (params) => {
        return {
          url: "v1/measures/statistics",
          method: "POST",
          params: {
            initialDate: params.initialDate?.toUTCString(),
            finalDate: params.finalDate?.toUTCString(),
          },
          body: {
            name: params.name,
          },
        };
      },
    }),
  }),
});

export const {
  useFindAllMeasuresMutation,
  useFindAllMeasuresByEquipmentMutation,
  useFindMeasuresByParameterMutation,
  useFindMeasureStatisticsMutation,
} = historyApi;
