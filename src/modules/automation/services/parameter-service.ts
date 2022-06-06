import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { AutomationRootState } from "modules/automation/stores/automation-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  ParameterRequest,
  ParameterResponse,
} from "app/models/data-center.model";

export const parameterApi = createApi({
  reducerPath: "parameterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: environment,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AutomationRootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ParameterResponse"],
  endpoints: (builder) => ({
    createParameter: builder.mutation<
      ApiResponseModel<ParameterResponse>,
      ParameterRequest
    >({
      query: (params) => ({
        url: "v1/data-center/parameters",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["ParameterResponse"],
    }),
    findAllParameters: builder.query<ParameterResponse[], void>({
      query: () => ({
        url: "v1/data-center/parameters",
      }),
      providesTags: ["ParameterResponse"],
    }),
    deleteParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/parameters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ParameterResponse"],
    }),
    findParameterByGroup: builder.mutation<ParameterResponse, string>({
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
