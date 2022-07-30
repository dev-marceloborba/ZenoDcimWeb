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
    deleteVirtualParameter: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/virtual-parameters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VirtualParameterModel"],
    }),
    // findParameterByGroup: builder.mutation<VirtualParametersModel, string>({
    //   query: (group) => ({
    //     url: `v1/data-center/parametersByGroup/${group}`,
    //     method: "GET",
    //   }),
    //   invalidatesTags: ["VirtualParameterModel"],
    // }),
    // createParametersIntoGroup: builder.mutation<any, EquipmentOnGroupViewModel>(
    //   {
    //     query: (params) => ({
    //       url: "v1/data-center/parameters/groupAssociation",
    //       method: "POST",
    //       body: params,
    //     }),
    //     invalidatesTags: ["VirtualParameterModel"],
    //   }
    // ),
  }),
});

export const {
  useCreateVirtualParameterMutation,
  useUpdateVirtualParameterMutation,
  useDeleteVirtualParameterMutation,
  useFindAllVirtualParametersQuery,
  //   useCreateParametersIntoGroupMutation,
  //   useFindParameterByGroupMutation,
} = virtualParameterApi;
