import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";

import { RootState } from "modules/core/store";
import {
  CreateSupplierViewModel,
  SupplierModel,
  UpdateSupplierViewModel,
} from "../models/supplier.model";

export const supplierApi = createApi({
  reducerPath: "supplierApi",
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
  tagTypes: ["SupplierModel"],
  endpoints: (builder) => ({
    createSupplier: builder.mutation<SupplierModel, CreateSupplierViewModel>({
      query: (params) => ({
        url: "v1/suppliers",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["SupplierModel"],
    }),
    updateSupplier: builder.mutation<SupplierModel, UpdateSupplierViewModel>({
      query: (params) => ({
        url: `v1/suppliers/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["SupplierModel"],
    }),
    findAllSuplliers: builder.query<SupplierModel[], void>({
      query: () => ({
        url: "v1/suppliers",
        method: "GET",
      }),
      providesTags: ["SupplierModel"],
    }),
    findSupplierById: builder.mutation<SupplierModel, string>({
      query: (id) => ({
        url: `v1/suppliers/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["SupplierModel"],
    }),
    deleteSupplier: builder.mutation<SupplierModel, string>({
      query: (id) => ({
        url: `v1/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SupplierModel"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useFindAllSuplliersQuery,
  useFindSupplierByIdMutation,
  useUpdateSupplierMutation,
} = supplierApi;
