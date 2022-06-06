import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { DatacenterRootState } from "modules/datacenter/stores/datacenter-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  RoomViewModel,
  RoomModel,
} from "modules/datacenter/models/datacenter-model";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: environment,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as DatacenterRootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["RoomModel"],
  endpoints: (builder) => ({
    createRoom: builder.mutation<ApiResponseModel<RoomModel>, RoomViewModel>({
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
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoomModel"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
  useFindRoomByIdMutation,
} = roomApi;
