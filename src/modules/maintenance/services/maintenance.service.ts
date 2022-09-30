import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import environment from "app/config/env";
import { RootState } from "modules/core/store";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import {
  CreateWorkOrderViewModel,
  WorkOrderModel,
  UpdateWorkOrderViewModel,
  WorkEventsTableViewModel,
  EMaintenanceStatus,
  WorkOrderDetailsViewModel,
  EWorkOrderNature,
  EMaintenanceType,
  EWorkOrderType,
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
            initialDate: getTimeStampFormat(workOrder.initialDate),
            finalDate: getTimeStampFormat(workOrder.finalDate),
          });
        });

        return output;
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
