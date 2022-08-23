import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  CompanyModel,
  CompanyViewModel,
  EditCompanyViewModel,
} from "../models/company-model";

export const companyApi = createApi({
  reducerPath: "companyApi",
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
  tagTypes: ["CompanyResponse"],
  endpoints: (builder) => ({
    createCompany: builder.mutation<
      ApiResponseModel<CompanyModel>,
      CompanyViewModel
    >({
      query: (params) => ({
        url: "v1/companies",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["CompanyResponse"],
    }),
    findAllCompanies: builder.query<CompanyModel[], void>({
      query: () => ({
        url: "v1/companies",
        method: "GET",
      }),
      providesTags: ["CompanyResponse"],
    }),
    deleteCompany: builder.mutation<ApiResponseModel<CompanyModel>, string>({
      query: (id) => ({
        url: `v1/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyResponse"],
    }),
    editCompany: builder.mutation<
      ApiResponseModel<CompanyModel>,
      EditCompanyViewModel
    >({
      query: (params) => ({
        url: `v1/companies/edit/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["CompanyResponse"],
    }),
    findCompanyById: builder.mutation<CompanyModel, string>({
      query: (id) => ({
        url: `v1/companies/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useEditCompanyMutation,
  useFindAllCompaniesQuery,
  useFindCompanyByIdMutation,
} = companyApi;
