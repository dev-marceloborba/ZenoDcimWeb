import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "app/store";
import { ApiResponse } from "./api-response";

export interface CompanyRequest {
  companyName: string;
  tradingName: string;
  registrationNumber: string;
}

export interface CompanyResponse extends CompanyRequest {
  id: string;
}

export interface ContractRequest {
  companyId: string;
  startDate: Date;
  endDate: Date;
  powerConsumptionDailyLimit: number;
  intervalEndingNotification: number;
}

export interface ContractResponse extends ContractRequest {
  id: string;
}

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
    listCompanies: builder.query<CompanyResponse[], void>({
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
    listContracts: builder.query<ContractResponse[], void>({
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
  useListCompaniesQuery,
  useListContractsQuery,
  useCreateCompanyMutation,
  useCreateContractMutation,
} = companyApi;
