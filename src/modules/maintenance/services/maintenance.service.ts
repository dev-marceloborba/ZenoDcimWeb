import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import dateFormaterInDDMMYYYY from "modules/utils/helpers/dateFormaterInDDMMYYYY";
import {
  CreateWorkOrderViewModel,
  WorkOrderModel,
  UpdateWorkOrderViewModel,
  WorkOrderDetailsViewModel,
  WorkOrderFilterViewModel,
  WorkOrderDraftEditor,
} from "../models/work-order.model";
import {
  getMaintenanceType,
  getOrderNature,
  getOrderType,
  getWorkOrderPriorityDescription,
} from "../utils/work-order.utils";

export const maintenanceApi = createApi({
  reducerPath: "maintenanceApi",
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
  tagTypes: ["WorkOrderModel"],
  endpoints: (builder) => ({
    createWorkOrder: builder.mutation<WorkOrderModel, WorkOrderDraftEditor>({
      query: (params) => ({
        url: "v1/work-orders",
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
    updateWorkOrder: builder.mutation<WorkOrderModel, UpdateWorkOrderViewModel>(
      {
        query: (params) => ({
          url: `v1/work-orders/${params.id}`,
          method: "PUT",
          body: params,
        }),
        invalidatesTags: ["WorkOrderModel"],
      }
    ),
    findAllWorkOrders: builder.query<
      WorkOrderModel[],
      WorkOrderFilterViewModel
    >({
      query: (filter) => ({
        url: "v1/work-orders",
        method: "GET",
        params: {
          status: filter.status,
        },
      }),
      providesTags: ["WorkOrderModel"],
    }),
    findWorkOrderById: builder.query<WorkOrderDetailsViewModel, string>({
      query: (id) => ({
        url: `v1/work-orders/${id}`,
        method: "GET",
      }),
      transformResponse: (response: WorkOrderModel) => {
        return {
          id: response.id,
          site: response.site.name,
          building: response.building.name,
          floor: response.floor.name,
          room: response.room.name,
          equipment: response.equipment.component,
          initialDate: dateFormaterInDDMMYYYY(new Date(response.initialDate)),
          finalDate: dateFormaterInDDMMYYYY(new Date(response.finalDate)),
          // responsible: response.responsible,
          executor: response.executor,
          supervisor: response.supervisor,
          manager: response.manager,
          description: response.description,
          nature: getOrderNature(response.nature),
          maintenanceType: getMaintenanceType(response.maintenanceType),
          orderType: getOrderType(response.orderType),
          cost: response.cost,
          estimatedRepairTime: response.estimatedRepairTime,
          realRepairTime: response.realRepairTime,
          title: response.title,
          priority: getWorkOrderPriorityDescription(response.priority),
          status: response.status,
        } as WorkOrderDetailsViewModel;
      },
      providesTags: ["WorkOrderModel"],
    }),
    deleteWorkOrder: builder.mutation<WorkOrderModel, string>({
      query: (id) => ({
        url: `v1/work-orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
    sendWorkOrderToApproval: builder.mutation<any, any>({
      query: ({ id, user }) => ({
        url: `v1/work-orders/send-to-approval/${id}`,
        method: "POST",
        params: {
          user,
        },
      }),
    }),
    approveWorkOrder: builder.mutation<any, any>({
      query: ({ id, user }) => ({
        url: `v1/work-orders/approve/${id}`,
        method: "POST",
        params: {
          user,
        },
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
    acceptWorkOrder: builder.mutation<any, any>({
      query: ({ id, user }) => ({
        url: `v1/work-orders/accept/${id}`,
        method: "POST",
        params: {
          user,
        },
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
    rejectWorkOrder: builder.mutation<any, any>({
      query: ({ id, user }) => ({
        url: `v1/work-orders/reject/${id}`,
        method: "POST",
        params: {
          user,
        },
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
    cancelWorkOrder: builder.mutation<any, any>({
      query: ({ id, user }) => ({
        url: `v1/work-orders/cancel/${id}`,
        method: "POST",
        params: {
          user,
        },
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
    finishWorkOrder: builder.mutation<any, any>({
      query: ({ id, user }) => ({
        url: `v1/work-orders/finish/${id}`,
        method: "POST",
        params: {
          user,
        },
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
  }),
});

export const {
  useCreateWorkOrderMutation,
  useDeleteWorkOrderMutation,
  useFindAllWorkOrdersQuery,
  useFindWorkOrderByIdQuery,
  useUpdateWorkOrderMutation,
  useAcceptWorkOrderMutation,
  useApproveWorkOrderMutation,
  useCancelWorkOrderMutation,
  useFinishWorkOrderMutation,
  useRejectWorkOrderMutation,
  useSendWorkOrderToApprovalMutation,
} = maintenanceApi;
