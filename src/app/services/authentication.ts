import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "app/store";
import { ApiResponse } from "./api-response";

export interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export enum EUserRole {
  ADMIN = 1,
  OPERATOR = 2,
  TECHNICIAN = 3,
  VIEW_ONLY = 4,
  EXTERNAL_CLIENT = 5,
}

export enum EUserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
  active: boolean;
}

type UsersResponse = UserResponse[];

export type UserResponseNormalized = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: string;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  role: EUserRole;
  companyId: string;
}

export interface EditUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
  active: EUserStatus;
}

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
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "v2/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUsers: builder.query<UserResponseNormalized[], void>({
      query: () => ({ url: "v1/users", method: "GET" }),
      transformResponse: (returnedUsers: UsersResponse) => {
        function getUserRoleDescription(role: EUserRole): string {
          switch (role) {
            case EUserRole.ADMIN:
              return "Administrador";
            case EUserRole.EXTERNAL_CLIENT:
              return "Cliente";
            case EUserRole.OPERATOR:
              return "Operador";
            case EUserRole.TECHNICIAN:
              return "Técnico";
            case EUserRole.VIEW_ONLY:
              return "Visualizador";
            default:
              return "Desconhecido";
          }
        }

        const users: UserResponseNormalized[] = [];
        returnedUsers.forEach((returnedUser) => {
          users.push({
            id: returnedUser.id,
            firstName: returnedUser.firstName,
            lastName: returnedUser.lastName,
            email: returnedUser.email,
            active: returnedUser.active ? "Ativo" : "Inativo",
            role: getUserRoleDescription(returnedUser.role),
          });
        });
        return users;
      },
    }),
    createUser: builder.mutation<ApiResponse<UserResponse>, UserRequest>({
      query: (user) => ({
        url: "v1/users",
        method: "POST",
        body: user,
      }),
    }),
    deleteUser: builder.mutation<ApiResponse<UserResponse>, { id: string }>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "DELETE",
      }),
    }),
    editUser: builder.mutation<ApiResponse<UserResponse>, EditUserRequest>({
      query: (user) => ({
        url: "v1/users/edit",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = api;
