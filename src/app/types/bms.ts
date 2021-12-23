export type Building = {
    name: string
    floors: Floor[]
}

export type Floor = {
    name: string
    rooms: Room[]
}

export type Room = {
    name: string
    equipments: BmsEquipment[]
}

export type BmsEquipment = {
    name: string
    mainEquipment?: boolean
    status: EEquipmentStatus
    groups: BmsGroup[]
}

export type BmsGroup = {
    name: string
    informations: BmsInformation[]
}

export type BmsInformation = {
    description: string
    value: number
    format?: string
    unit?: string
    parameterStatus: EParameterStatus
}

export enum EEquipmentStatus {
    OFFLINE = 0,
    ONLINE = 1
}

export enum EParameterStatus {
    NORMAL = 0,
    ALERT = 1,
    DANGER = 1
}