import { Building, EEquipmentStatus, EParameterStatus } from "app/types/bms";

export const building01: Building = {
    name: 'Prédio 1',
    floors: [
        {
            name: "Andar 1",
            rooms: [
                {
                    name: "Sala 1",
                    equipments: [
                        {
                            name: "TR 1",
                            mainEquipment: true,
                            status: EEquipmentStatus.ONLINE,
                            groups: [
                                {
                                    name: "Energia",
                                    informations: [
                                        {
                                            description: "Potência",
                                            value: 1700,
                                            unit: "kW",
                                            parameterStatus: EParameterStatus.NORMAL
                                        },
                                        {
                                            description: "Corrente",
                                            value: 2040,
                                            unit: "A",
                                            parameterStatus: EParameterStatus.NORMAL
                                        },
                                        {
                                            description: "Tensão",
                                            value: 490,
                                            unit: "V",
                                            parameterStatus: EParameterStatus.ALERT
                                        },
                                        {
                                            description: "THD",
                                            value: 20,
                                            unit: "%",
                                            parameterStatus: EParameterStatus.DANGER
                                        }
                                    ]
                                },
                                {
                                    name: "Clima",
                                    informations: [
                                        {
                                            description: "Temperatura",
                                            value: 20,
                                            unit: "C",
                                            parameterStatus: EParameterStatus.NORMAL
                                        },
                                        {
                                            description: "Umidade",
                                            value: 50,
                                            unit: "%",
                                            parameterStatus: EParameterStatus.NORMAL
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}   