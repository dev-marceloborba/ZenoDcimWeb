import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  UpdateVirtualParameterViewModel,
  VirtualParameterModel,
  VirtualParametersModel,
  VirtualParameterViewModel,
} from "../models/virtual-parameter-model";

export const virtualParameterApi = createApi({
  reducerPath: "virtualParameterApi",
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
  tagTypes: ["VirtualParameterModel"],
  endpoints: (builder) => ({
    createVirtualParameter: builder.mutation<
      ApiResponseModel<VirtualParameterModel>,
      VirtualParameterViewModel
    >({
      query: (params) => ({
        url: "v1/data-center/virtual-parameters",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["VirtualParameterModel"],
    }),
    updateVirtualParameter: builder.mutation<
      ApiResponseModel<VirtualParameterModel>,
      UpdateVirtualParameterViewModel
    >({
      query: (params) => ({
        url: `v1/data-center/virtual-parameters/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["VirtualParameterModel"],
    }),
    findAllVirtualParameters: builder.query<VirtualParametersModel, void>({
      query: () => ({
        url: "v1/data-center/virtual-parameters",
      }),
      providesTags: ["VirtualParameterModel"],
    }),
    findVirtualParameterById: builder.mutation<VirtualParameterModel, string>({
      query: (id) => ({
        url: `v1/data-center/virtual-parameters/${id}`,
      }),
      invalidatesTags: ["VirtualParameterModel"],
    }),
    deleteVirtualParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/virtual-parameters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VirtualParameterModel"],
    }),
  }),
});

export const {
  useCreateVirtualParameterMutation,
  useUpdateVirtualParameterMutation,
  useDeleteVirtualParameterMutation,
  useFindAllVirtualParametersQuery,
  useFindVirtualParameterByIdMutation,
} = virtualParameterApi;
