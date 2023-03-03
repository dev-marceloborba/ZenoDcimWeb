import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import {
  AuthModel,
  LoginViewModel,
  UserModel,
  UsersModel,
  UserEditorModel,
} from "modules/user/models/user-model";

import { ApiResponse } from "../models/api-response";

export const api = createApi({
  reducerPath: "usersApi",
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
  tagTypes: ["UsersModel"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthModel>, LoginViewModel>({
      query: (credentials) => ({
        url: "v1/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    findAllUsers: builder.query<UsersModel, void>({
      query: () => ({ url: "v1/users", method: "GET" }),

      providesTags: ["UsersModel"],
    }),
    createUser: builder.mutation<ApiResponse<UserModel>, UserEditorModel>({
      query: (user) => ({
        url: "v1/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UsersModel"],
    }),
    deleteUser: builder.mutation<ApiResponse<UserModel>, string>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UsersModel"],
    }),
    editUser: builder.mutation<ApiResponse<UserModel>, UserEditorModel>({
      query: (user) => ({
        url: "v1/users/edit",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UsersModel"],
    }),
    findUserById: builder.mutation<UserModel, string>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useFindAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useFindUserByIdMutation,
} = api;
