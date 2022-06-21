import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import { ParameterModel, ParameterViewModel } from "../models/automation-model";

export const parameterApi = createApi({
  reducerPath: "parameterApi",
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
  tagTypes: ["ParameterModel"],
  endpoints: (builder) => ({
    createParameter: builder.mutation<
      ApiResponseModel<ParameterModel>,
      ParameterViewModel
    >({
      query: (params) => ({
        url: "v1/data-center/parameters",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["ParameterModel"],
    }),
    findAllParameters: builder.query<ParameterModel[], void>({
      query: () => ({
        url: "v1/data-center/parameters",
      }),
      providesTags: ["ParameterModel"],
    }),
    deleteParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/parameters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ParameterModel"],
    }),
    findParameterByGroup: builder.mutation<ParameterModel, string>({
      query: (group) => ({
        url: `v1/data-center/parametersByGroup/${group}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateParameterMutation,
  useDeleteParameterMutation,
  useFindAllParametersQuery,
  useFindParameterByGroupMutation,
} = parameterApi;
