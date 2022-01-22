export type EnergyEquipmentRequest = {
    name: string
    campus: string
    floor: string
    building: string
    room: string
}

export type NewAutomationParameterRequest = {
    parameter: string
    unit: string
    limitMin: number
    limitMax: number
    scale: number
    dataSource: string
    address: string
}