import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import { RootState } from "modules/core/store";
import {
  EditEquipmentParameterGroupViewModel,
  EquipmentOnGroupViewModel,
  EquipmentParameterGroupModel,
  EquipmentParameterGroupViewModel,
} from "../models/automation-model";

export const parameterGroupApi = createApi({
  reducerPath: "parameterGroupApi",
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
  tagTypes: ["EquipmentParameterGroupModel", "ParameterModel"],
  endpoints: (builder) => ({
    createEquipmentParameterGroup: builder.mutation<
      ApiResponseModel<EquipmentParameterGroupModel>,
      EquipmentParameterGroupViewModel
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter/group",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["EquipmentParameterGroupModel"],
    }),
    editEquipmentParameterGroup: builder.mutation<
      ApiResponseModel<EquipmentParameterGroupModel>,
      EditEquipmentParameterGroupViewModel
    >({
      query: (params) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/group/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["EquipmentParameterGroupModel"],
    }),
    findAllParameterGroups: builder.query<EquipmentParameterGroupModel[], void>(
      {
        query: () => ({
          url: "v1/data-center/building/floor/room/equipment/parameter/group",
        }),
        providesTags: ["EquipmentParameterGroupModel"],
      }
    ),
    deleteParameterGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentParameterGroupModel"],
    }),
    // createParametersIntoGroup: builder.mutation<any, EquipmentOnGroupViewModel>(
    //   {
    //     query: (params) => ({
    //       url: "v1/data-center/parameters/groupAssociation",
    //       method: "POST",
    //       body: params,
    //     }),
    //     invalidatesTags: ["ParameterModel", "EquipmentParameterGroupModel"],
    //   }
    // ),
  }),
});

export const {
  useCreateEquipmentParameterGroupMutation,
  useEditEquipmentParameterGroupMutation,
  useDeleteParameterGroupMutation,
  useFindAllParameterGroupsQuery,
  // useCreateParametersIntoGroupMutation,
} = parameterGroupApi;
