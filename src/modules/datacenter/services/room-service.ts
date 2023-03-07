import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RoomModel, RoomEditorViewModel } from "../models/room.model";
import { RootState } from "modules/core/store";
import { OccupationModel } from "../models/occupation.model";

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
  tagTypes: ["RoomModel"],
  endpoints: (builder) => ({
    createRoom: builder.mutation<
      ApiResponseModel<RoomModel>,
      RoomEditorViewModel
    >({
      query: (newRoom) => ({
        url: "v1/data-center/building/floor/room",
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: ["RoomModel"],
    }),
    findAllRooms: builder.query<RoomModel[], void>({
      query: () => ({
        url: "v1/data-center/building/floor/room",
      }),
      providesTags: ["RoomModel"],
    }),
    findRoomById: builder.mutation<RoomModel, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/${id}`,
        method: "GET",
      }),
    }),
    findRoomsByFloorId: builder.mutation<RoomModel[], string>({
      query: (id) => ({
        url: `v1/data-center/rooms-by-floor/${id}`,
        method: "GET",
      }),
    }),
    updateRoom: builder.mutation<void, RoomEditorViewModel>({
      query: (data) => ({
        url: `v1/data-center/building/floor/room/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["RoomModel"],
    }),
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoomModel"],
    }),
    loadOccupationCard: builder.mutation<OccupationModel[], string>({
      query: (buildingId) => ({
        url: `v1/data-center/building/floor/room/occupation-card/${buildingId}`,
        method: "GET"
      })
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
  useFindRoomByIdMutation,
  useFindRoomsByFloorIdMutation,
  useUpdateRoomMutation,
  useLoadOccupationCardMutation,
} = roomApi;
