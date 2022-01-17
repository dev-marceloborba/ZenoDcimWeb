export enum EStatus {
    ONLINE = 0,
    OFFLINE = 1
}

export const equipmentConnectivity = [
    {
        group: "Energia",
        data: [
            {
                status: EStatus.ONLINE,
                description: "RPP XYZ" 
            },
            {
                status: EStatus.ONLINE,
                description: "RPP XPA" 
            },
            {
                status: EStatus.OFFLINE,
                description: "PDU A Andar 1" 
            },
            {
                status: EStatus.OFFLINE,
                description: "PDU B Andar 1" 
            },
            {
                status: EStatus.OFFLINE,
                description: "PDU C Andar 1" 
            },
            {
                status: EStatus.OFFLINE,
                description: "QG Climatização A Sul Andar 1" 
            },
            {
                status: EStatus.OFFLINE,
                description: "QG Climatização B Norte Andar 1" 
            },
            {
                status: EStatus.OFFLINE,
                description: "QG Força e Serviço Andar 1" 
            },
            {
                status: EStatus.OFFLINE,
                description: "PDU C Andar 3" 
            },
            {
                status: EStatus.OFFLINE,
                description: "QG Climatização A Sul Andar 2" 
            },
            {
                status: EStatus.OFFLINE,
                description: "QG Climatização B Norte Andar 2" 
            },
            {
                status: EStatus.OFFLINE,
                description: "PDU C Andar 4" 
            },
            {
                status: EStatus.OFFLINE,
                description: "QG Climatização A Sul Andar 4" 
            },
        ]
    },
    {
        group: "Climatização",
        data: [
            {
                status: EStatus.ONLINE,
                description: "Válvula Esfera XYD"
            },
            {
                status: EStatus.ONLINE,
                description: "Válvula Esfera XYA"
            },
            {
                status: EStatus.OFFLINE,
                description: "Válvula Solenóide XYD"
            },
            {
                status: EStatus.OFFLINE,
                description: "Válvula Solenóide XYA"
            },
            {
                status: EStatus.OFFLINE,
                description: "Fan Coil ABC"
            },
            {
                status: EStatus.OFFLINE,
                description: "Fan Coil ABD"
            },
            {
                status: EStatus.OFFLINE,
                description: "Fan Coil ABE"
            },
            {
                status: EStatus.OFFLINE,
                description: "Fan Coil ABG"
            },
            {
                status: EStatus.OFFLINE,
                description: "Chiller A"
            },
            {
                status: EStatus.OFFLINE,
                description: "Chiller B"
            },
            {
                status: EStatus.OFFLINE,
                description: "Chiller C"
            },
            {
                status: EStatus.OFFLINE,
                description: "Chiller D"
            },
            {
                status: EStatus.OFFLINE,
                description: "Válvula Motorizada A"
            },
        ]
    },
    {
        group: "Telecomunicações",
        data: [
            {
                status: EStatus.ONLINE,
                description: "Switch TOR ABC",
            },
            {
                status: EStatus.ONLINE,
                description: "Switch gerenciável ABD",
            },
            {
                status: EStatus.OFFLINE,
                description: "Switch Core XYE",
            },
            {
                status: EStatus.OFFLINE,
                description: "Rack XYZ",
            },
            {
                status: EStatus.OFFLINE,
                description: "Rack XYW",
            },
            {
                status: EStatus.OFFLINE,
                description: "Rack XYY",
            },
            {
                status: EStatus.OFFLINE,
                description: "Rack XZZ",
            },
            {
                status: EStatus.OFFLINE,
                description: "Switch Core XYY",
            },
        ]
    }
]