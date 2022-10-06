import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  CreateGroupViewModel,
  GroupModel,
  UpdateGroupViewModel,
} from "../models/group.model";

export const groupApi = createApi({
  reducerPath: "groupApi",
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
  tagTypes: ["GroupModel"],
  endpoints: (builder) => ({
    createGroup: builder.mutation<
      ApiResponseModel<GroupModel>,
      CreateGroupViewModel
    >({
      query: (params) => ({
        url: "v1/groups",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["GroupModel"],
    }),
    findAllGroups: builder.query<GroupModel[], void>({
      query: () => ({
        url: "v1/groups",
        method: "GET",
      }),
      providesTags: ["GroupModel"],
    }),
    findGroupById: builder.mutation<GroupModel, string>({
      query: (id) => ({
        url: `v1/groups/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["GroupModel"],
    }),
    updateGroup: builder.mutation<GroupModel, UpdateGroupViewModel>({
      query: (params) => ({
        url: `v1/groups/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["GroupModel"],
    }),
    deleteGroup: builder.mutation<GroupModel, string>({
      query: (id) => ({
        url: `v1/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GroupModel"],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useFindAllGroupsQuery,
  useFindGroupByIdMutation,
  useUpdateGroupMutation,
} = groupApi;
