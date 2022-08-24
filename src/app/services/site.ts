import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "modules/core/store";
import { ApiResponse } from "../models/api-response";
import environment from "app/config/env";
import { SiteRequest, SiteResponse } from "app/models/data-center.model";

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
  tagTypes: ["SiteResponse"],
  endpoints: (builder) => ({
    createSite: builder.mutation<ApiResponse<SiteResponse>, SiteRequest>({
      query: (params) => ({
        url: "v1/data-center/site",
        method: "POST",
        data: params,
      }),
      invalidatesTags: ["SiteResponse"],
    }),
    findAllSites: builder.query<SiteResponse[], void>({
      query: () => ({ url: "v1/data-center/site" }),
      providesTags: ["SiteResponse"],
    }),
    deleteSite: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/site/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SiteResponse"],
    }),
  }),
});

export const {
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useFindAllSitesQuery,
} = siteApi;
