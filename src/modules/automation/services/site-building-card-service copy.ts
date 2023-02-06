import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  BuildingCardModel,
  UpdateBuildingCardViewModel,
} from "../models/building-card-model";

export const siteBuildingCardApi = createApi({
  reducerPath: "siteBuildingCardApi",
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
  tagTypes: ["BuildingCardModel", "UpdateBuildingCardViewModel"],
  endpoints: (builder) => ({
    loadCards: builder.query<BuildingCardModel[], void>({
      query: () => ({
        url: "v1/data-center/sites/load-cards",
        method: "GET",
      }),
      providesTags: ["BuildingCardModel", "UpdateBuildingCardViewModel"],
    }),
    loadBuildingCards: builder.query<BuildingCardModel[], string>({
      query: (id) => ({
        url: `v1/data-center/building/load-cards/${id}`,
        method: "GET",
      }),
      providesTags: ["BuildingCardModel", "UpdateBuildingCardViewModel"],
    }),
    updateSiteBuildingCard: builder.mutation<any, UpdateBuildingCardViewModel>({
      query: (params) => ({
        url: `v1/site-building-card-settings/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["BuildingCardModel", "UpdateBuildingCardViewModel"],
    }),
  }),
});

export const {
  useLoadCardsQuery,
  useLoadBuildingCardsQuery,
  useUpdateSiteBuildingCardMutation,
} = siteBuildingCardApi;
