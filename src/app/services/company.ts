import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import {
  CompanyRequest,
  CompanyResponse,
  ContractRequest,
  ContractResponse,
} from "app/models/company.model";
import { RootState } from "app/store";
import { ApiResponse } from "../models/api-response";

export const companyApi = createApi({
  reducerPath: "companiesApi",
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
  tagTypes: ["CompanyResponse", "ContractResponse"],
  endpoints: (builder) => ({
    findAllCompanies: builder.query<CompanyResponse[], void>({
      query: () => ({ url: "v1/companies" }),
    }),
    createCompany: builder.mutation<
      ApiResponse<CompanyResponse>,
      CompanyRequest
    >({
      query: (company) => ({
        url: "v1/companies",
        method: "POST",
        body: company,
      }),
    }),
    findAllContracts: builder.query<ContractResponse[], void>({
      query: () => ({
        url: "v1/contracts",
      }),
    }),
    createContract: builder.mutation<
      ApiResponse<ContractResponse>,
      ContractRequest
    >({
      query: (contract) => ({
        url: "v1/contracts",
        method: "POST",
        body: contract,
      }),
    }),
  }),
});

export const {
  useFindAllCompaniesQuery,
  useFindAllContractsQuery,
  useCreateCompanyMutation,
  useCreateContractMutation,
} = companyApi;
