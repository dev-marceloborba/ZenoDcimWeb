import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "app/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
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
  tagTypes: ["UserResponseNormalized", "UsersResponse"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponseModel<AuthModel>, LoginViewModel>({
      query: (credentials) => ({
        url: "v1/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    findAllUsers: builder.query<UserModelNormalized[], void>({
      query: () => ({ url: "v1/users", method: "GET" }),
      transformResponse: (returnedUsers: UsersModel) => {
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

        const users: UserModelNormalized[] = [];
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
      providesTags: ["UserResponseNormalized"],
    }),
    createUser: builder.mutation<ApiResponseModel<UserModel>, UserViewModel>({
      query: (user) => ({
        url: "v1/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserResponseNormalized"],
    }),
    deleteUser: builder.mutation<ApiResponseModel<UserModel>, string>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserResponseNormalized"],
    }),
    editUser: builder.mutation<ApiResponseModel<UserModel>, EditUserViewModel>({
      query: (user) => ({
        url: "v1/users/edit",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserResponseNormalized"],
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
