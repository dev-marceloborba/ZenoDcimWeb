import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "modules/automation/stores/automation-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import environment from "app/config/env";
import {
  SiteViewModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";

export const siteApi = createApi({
  reducerPath: "siteApi",
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
  tagTypes: ["SiteModel"],
  endpoints: (builder) => ({
    createSite: builder.mutation<ApiResponseModel<SiteModel>, SiteViewModel>({
      query: (params) => ({
        url: "v1/data-center/site",
        method: "POST",
        data: params,
      }),
      invalidatesTags: ["SiteModel"],
    }),
    findAllSites: builder.query<SiteModel[], void>({
      query: () => ({ url: "v1/data-center/site" }),
      providesTags: ["SiteModel"],
    }),
    deleteSite: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/site/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SiteModel"],
    }),
  }),
});

export const {
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useFindAllSitesQuery,
} = siteApi;
