import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import environment from "app/config/env";
import {
  SiteViewModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";
import { RootState } from "modules/core/store";

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
        url: "v1/data-center/sites",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["SiteModel"],
    }),
    findAllSites: builder.query<SiteModel[], void>({
      query: () => ({ url: "v1/data-center/sites" }),
      providesTags: ["SiteModel"],
    }),
    deleteSite: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/sites/${id}`,
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
