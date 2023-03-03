import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  AuthModel,
  LoginViewModel,
  UserModel,
  UsersModel,
  UserEditorModel,
} from "modules/user/models/user-model";

export const userApi = createApi({
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
  tagTypes: ["UserModel", "UsersResponse"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponseModel<AuthModel>, LoginViewModel>({
      query: (credentials) => ({
        url: "v1/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    findAllUsers: builder.query<UsersModel, void>({
      query: () => ({ url: "v1/users", method: "GET" }),
      providesTags: ["UserModel"],
    }),
    createUser: builder.mutation<ApiResponseModel<UserModel>, UserEditorModel>({
      query: (user) => ({
        url: "v1/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserModel"],
    }),
    deleteUser: builder.mutation<ApiResponseModel<UserModel>, string>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserModel"],
    }),
    editUser: builder.mutation<ApiResponseModel<UserModel>, UserEditorModel>({
      query: (user) => ({
        url: "v1/users/edit",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserModel"],
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
} = userApi;
