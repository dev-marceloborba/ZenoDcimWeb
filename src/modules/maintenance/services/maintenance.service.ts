import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import {
  CreateWorkOrderViewModel,
  WorkOrderModel,
  UpdateWorkOrderViewModel,
  WorkEventsTableViewModel,
  WorkOrderDetailsViewModel,
  EWorkOrderNature,
  EMaintenanceType,
  EWorkOrderType,
  EOrderPriority,
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
        function getMaintenanceTypeDescription(
          maintenanceType: EMaintenanceType
        ) {
          switch (maintenanceType) {
            case EMaintenanceType.CORRECTIVE:
              return "Corretiva";
            case EMaintenanceType.PREVENTIVE:
              return "Preventiva";
          }
        }

        function getOperationNatureDescription(
          operationNature: EWorkOrderNature
        ) {
          switch (operationNature) {
            case EWorkOrderNature.ATTENDANCE:
              return "Acompanhamento";
            case EWorkOrderNature.CUSTOMER_SERVICE:
              return "Atendimento";
            case EWorkOrderNature.EMERGENCY:
              return "Emergência";
            case EWorkOrderNature.PLANNED:
              return "Planejada";
          }
        }

        return response.map<WorkEventsTableViewModel>((workOrder) => ({
          id: workOrder.id,
          title: workOrder?.title ?? "",
          maintenanceType: getMaintenanceTypeDescription(
            workOrder.maintenanceType
          ),
          operationNature: getOperationNatureDescription(workOrder.nature),
          equipment: workOrder.equipment.component,
          responsible: workOrder.responsible,
          initialDate: getTimeStampFormat(workOrder.initialDate),
          finalDate: getTimeStampFormat(workOrder.finalDate),
        }));
      },
    }),
    findWorkOrderById: builder.mutation<WorkOrderDetailsViewModel, string>({
      query: (id) => ({
        url: `v1/work-orders/${id}`,
        method: "GET",
      }),
      transformResponse: (response: WorkOrderModel) => {
        let output: WorkOrderDetailsViewModel = {} as WorkOrderDetailsViewModel;
        function getOrderNature(nature: EWorkOrderNature) {
          switch (nature) {
            case EWorkOrderNature.ATTENDANCE:
              return "Acompanhamento";
            case EWorkOrderNature.CUSTOMER_SERVICE:
              return "Atendimento";
            case EWorkOrderNature.EMERGENCY:
              return "Emergência";
            case EWorkOrderNature.PLANNED:
              return "Planejada";
          }
        }

        function getMaintenanceType(maintenanceType: EMaintenanceType) {
          switch (maintenanceType) {
            case EMaintenanceType.CORRECTIVE:
              return "Corretiva";
            case EMaintenanceType.PREVENTIVE:
              return "Preventiva";
          }
        }

        function getOrderType(orderType: EWorkOrderType) {
          switch (orderType) {
            case EWorkOrderType.ELECTRICAL:
              return "Elétrica";
            case EWorkOrderType.NETWORK:
              return "Rede";
          }
        }

        function getWorkOrderPriorityDescription(
          workOrderPriority: EOrderPriority
        ) {
          switch (workOrderPriority) {
            case EOrderPriority.LOW:
              return "Baixa";
            case EOrderPriority.MEDIUM:
              return "Média";
            case EOrderPriority.HIGH:
              return "Alta";
          }
        }

        output.id = response.id;
        output.site = response.site.name;
        output.building = response.building.name;
        output.floor = response.floor.name;
        output.room = response.room.name;
        output.equipment = response.equipment.component;
        output.initialDate = getTimeStampFormat(response.initialDate);
        output.finalDate = getTimeStampFormat(response.finalDate);
        output.responsible = response.responsible;
        output.description = response.description;
        output.nature = getOrderNature(response.nature);
        output.maintenanceType = getMaintenanceType(response.maintenanceType);
        output.orderType = getOrderType(response.orderType);
        output.cost = response.cost;
        output.estimatedRepairTime = response.estimatedRepairTime;
        output.realRepairTime = response.realRepairTime;
        output.title = response.title;
        output.priority = getWorkOrderPriorityDescription(response.priority);

        return output;
      },
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
