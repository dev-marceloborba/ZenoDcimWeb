import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponse } from "../models/api-response";
import { RoomRequest, RoomResponse } from "app/models/data-center.model";

export const roomApi = createApi({
  reducerPath: "roomApi",
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
  tagTypes: ["RoomResponse"],
  endpoints: (builder) => ({
    createRoom: builder.mutation<ApiResponse<RoomResponse>, RoomRequest>({
      query: (newRoom) => ({
        url: "v1/data-center/building/floor/room",
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: ["RoomResponse"],
    }),
    findAllRooms: builder.query<RoomResponse[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room",
      }),
      providesTags: ["RoomResponse"],
    }),
    findRoomById: builder.mutation<RoomResponse, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/${id}`,
        method: "GET",
      }),
    }),
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoomResponse"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
  useFindRoomByIdMutation,
} = roomApi;
