import { EWorkOrderStatus } from "./work-order.model"

export interface WorkOrderEventModel {
    id: string
    createdAt: Date
    status: EWorkOrderStatus
    info?: string
    user: string
}