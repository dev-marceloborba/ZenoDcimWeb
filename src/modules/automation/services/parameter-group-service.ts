import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import environment from "app/config/env";
import { AutomationRootState } from "modules/automation/stores/automation-store";
import { ApiResponseModel } from "modules/shared/models/api-response-model";
import {
  EquipmentParameterGroupRequest,
  EquipmentParameterGroupResponse,
} from "app/models/data-center.model";

export const parameterGroupApi = createApi({
  reducerPath: "parameterGroupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: environment,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AutomationRootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["EquipmentParameterGroupResponse"],
  endpoints: (builder) => ({
    createEquipmentParameterGroup: builder.mutation<
      ApiResponseModel<EquipmentParameterGroupRequest>,
      EquipmentParameterGroupResponse
    >({
      query: (params) => ({
        url: "v1/data-center/building/floor/room/equipment/parameter/group",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["EquipmentParameterGroupResponse"],
    }),
    findAllParameterGroups: builder.query<
      EquipmentParameterGroupResponse[],
      void
    >({
      query: () => ({
        url: "v1/data-center/building/floor/room/equipment/parameter/group",
      }),
      providesTags: ["EquipmentParameterGroupResponse"],
    }),
    deleteParameterGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/data-center/building/floor/room/equipment/parameter/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentParameterGroupResponse"],
    }),
  }),
});

export const {
  useCreateEquipmentParameterGroupMutation,
  useDeleteParameterGroupMutation,
  useFindAllParameterGroupsQuery,
} = parameterGroupApi;