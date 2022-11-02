import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { UserPreferenciesModel } from "modules/user/models/user-preferencies.model";

export const userPreferenciesApi = createApi({
  reducerPath: "userPreferenciesApi",
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
  tagTypes: ["UserPreferenciesModel"],
  endpoints: (builder) => ({
    findUserPreferencies: builder.mutation<UserPreferenciesModel, string>({
      query: (id) => ({
        url: `v1/user-preferencies/${id}`,
        method: "GET",
      }),
    }),
    updateUserPreferencies: builder.mutation<any, any>({
      query: (params) => ({
        url: `v1/user-preferencies/${params.id}`,
        method: "PUT",
        body: params,
      }),
    }),
  }),
});

export const {
  useFindUserPreferenciesMutation,
  useUpdateUserPreferenciesMutation,
} = userPreferenciesApi;
