import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  SiteCardModel,
  UpdateSiteCardViewModel,
} from "../models/site-card-model";

export const siteCardApi = createApi({
  reducerPath: "siteCardApi",
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
  tagTypes: ["SiteCardModel", "UpdateSiteCardViewModel"],
  endpoints: (builder) => ({
    loadCards: builder.query<SiteCardModel[], void>({
      query: () => ({
        url: "v1/data-center/sites/load-cards",
        method: "GET",
      }),
      providesTags: ["SiteCardModel", "UpdateSiteCardViewModel"],
    }),
    updateSiteCard: builder.mutation<any, UpdateSiteCardViewModel>({
      query: (params) => ({
        url: `v1/site-card-settings/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["SiteCardModel", "UpdateSiteCardViewModel"],
    }),
  }),
});

export const { useLoadCardsQuery, useUpdateSiteCardMutation } = siteCardApi;
