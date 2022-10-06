import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import {
  AuthModel,
  EditUserViewModel,
  EUserRole,
  LoginViewModel,
  UserModel,
  UserModelNormalized,
  UsersModel,
  UserViewModel,
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
  tagTypes: ["UserModelNormalized", "UsersModel"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthModel>, LoginViewModel>({
      query: (credentials) => ({
        url: "v1/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    findAllUsers: builder.query<UserModelNormalized[], void>({
      query: () => ({ url: "v1/users", method: "GET" }),
      transformResponse: (returnedUsers: UsersModel) => {
        // function getUserRoleDescription(role: EUserRole): string {
        //   switch (role) {
        //     case EUserRole.ADMIN:
        //       return "Administrador";
        //     case EUserRole.EXTERNAL_CLIENT:
        //       return "Cliente";
        //     case EUserRole.OPERATOR:
        //       return "Operador";
        //     case EUserRole.TECHNICIAN:
        //       return "Técnico";
        //     case EUserRole.VIEW_ONLY:
        //       return "Visualizador";
        //     default:
        //       return "Desconhecido";
        //   }
        // }

        const users: UserModelNormalized[] = [];
        returnedUsers.forEach((returnedUser) => {
          users.push({
            id: returnedUser.id,
            firstName: returnedUser.firstName,
            lastName: returnedUser.lastName,
            email: returnedUser.email,
            active: returnedUser.active ? "Ativo" : "Inativo",
            group: returnedUser.group.name,
          });
        });
        return users;
      },
      providesTags: ["UserModelNormalized"],
    }),
    createUser: builder.mutation<ApiResponse<UserModel>, UserViewModel>({
      query: (user) => ({
        url: "v1/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserModelNormalized"],
    }),
    deleteUser: builder.mutation<ApiResponse<UserModel>, string>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserModelNormalized"],
    }),
    editUser: builder.mutation<ApiResponse<UserModel>, EditUserViewModel>({
      query: (user) => ({
        url: "v1/users/edit",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserModelNormalized"],
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
