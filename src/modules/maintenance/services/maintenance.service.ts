import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import {
  CreateWorkOrderViewModel,
  WorkOrderModel,
  UpdateWorkOrderViewModel,
  WorkEventsTableViewModel,
  EMaintenanceStatus,
} from "../models/work-order.model";

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
    createWorkOrder: builder.mutation<WorkOrderModel, CreateWorkOrderViewModel>(
      {
        query: (params) => ({
          url: "v1/work-orders",
          method: "POST",
          body: params,
        }),
        invalidatesTags: ["WorkOrderModel"],
      }
    ),
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
    findAllWorkOrders: builder.query<WorkEventsTableViewModel[], void>({
      query: () => ({
        url: "v1/work-orders",
        method: "GET",
      }),
      providesTags: ["WorkOrderModel"],
      transformResponse: (response: WorkOrderModel[]) => {
        const output: WorkEventsTableViewModel[] = [];

        function getStatusDescription(status: EMaintenanceStatus) {
          switch (status) {
            case EMaintenanceStatus.CANCELLED:
              return "Cancelada";
            case EMaintenanceStatus.CLOSED:
              return "Fechada";
            case EMaintenanceStatus.CREATED:
              return "Criada";
            case EMaintenanceStatus.IN_PROGRESS:
              return "Em andamento";
            case EMaintenanceStatus.POSTPONED:
              return "Adiada";
          }
        }

        response.forEach((workOrder) => {
          output.push({
            id: workOrder.id,
            site: workOrder.site.name,
            building: workOrder.building.name,
            floor: workOrder.floor.name,
            room: workOrder.room.name,
            equipment: workOrder.equipment.component,
            status: getStatusDescription(workOrder.status),
            initialDate: workOrder.initialDate,
            finalDate: workOrder.finalDate,
          });
        });

        return output;
      },
    }),
    findWorkOrderById: builder.mutation<WorkOrderModel, string>({
      query: (id) => ({
        url: `v1/work-orders/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
    deleteWorkOrder: builder.mutation<WorkOrderModel, string>({
      query: (id) => ({
        url: `v1/work-orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkOrderModel"],
    }),
  }),
});

export const {
  useCreateWorkOrderMutation,
  useDeleteWorkOrderMutation,
  useFindAllWorkOrdersQuery,
  useFindWorkOrderByIdMutation,
  useUpdateWorkOrderMutation,
} = maintenanceApi;
