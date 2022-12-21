import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  EquipmentCardModel,
  UpdateEquipmentCardViewModel,
} from "../models/equipment-card-model";

export const equipmentCardSettingsApi = createApi({
  reducerPath: "equipmentCardSettingsApi",
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
  tagTypes: ["EquipmentCardModel", "UpdateEquipmentCardViewModel"],
  endpoints: (builder) => ({
    loadEquipmentCards: builder.query<EquipmentCardModel[], string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/load-cards/${id}`,
        method: "GET",
      }),
      providesTags: ["EquipmentCardModel", "UpdateEquipmentCardViewModel"],
    }),
    updateEquipmentCard: builder.mutation<any, UpdateEquipmentCardViewModel>({
      query: (params) => ({
        url: `v1/equipment-card-settings/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["EquipmentCardModel", "UpdateEquipmentCardViewModel"],
    }),
  }),
});

export const { useLoadEquipmentCardsQuery, useUpdateEquipmentCardMutation } =
  equipmentCardSettingsApi;
