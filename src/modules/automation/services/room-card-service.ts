import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  RoomCardModel,
  UpdateRoomCardViewModel,
} from "../models/room-card-model";

export const roomCardSettingsApi = createApi({
  reducerPath: "roomCardSettingsApi",
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
  tagTypes: ["RoomCardModel", "UpdateRoomCardViewModel"],
  endpoints: (builder) => ({
    loadRoomCards: builder.query<RoomCardModel[], string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/load-cards/${id}`,
        method: "GET",
      }),
      providesTags: ["RoomCardModel", "UpdateRoomCardViewModel"],
    }),
    updateRoomCard: builder.mutation<any, UpdateRoomCardViewModel>({
      query: (params) => ({
        url: `v1/room-card-settings/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["RoomCardModel", "UpdateRoomCardViewModel"],
    }),
  }),
});

export const { useLoadRoomCardsQuery, useUpdateRoomCardMutation } =
  roomCardSettingsApi;
