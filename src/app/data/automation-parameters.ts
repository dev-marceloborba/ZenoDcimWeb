export type AutomationParameters = {
  parameter: string;
  unit: string;
  controller: string;
  address: string;
  minLimit: number;
  maxLimit: number;
  scale: number;
  rules: number;
};

export const automationParameters: AutomationParameters[] = [
  {
    parameter: "Tensão",
    unit: "V",
    controller: "PLC 1",
    address: "101",
    minLimit: 0,
    maxLimit: 450,
    scale: 0.1,
    rules: 1,
  },
  {
    parameter: "Corrente",
    unit: "A",
    controller: "PLC 1",
    address: "102",
    minLimit: 0,
    maxLimit: 1000,
    scale: 1,
    rules: 0,
  },
  {
    parameter: "Potência ativa",
    unit: "W",
    controller: "PLC 1",
    address: "103",
    minLimit: 0,
    maxLimit: 4500,
    scale: 10,
    rules: 0,
  },
  {
    parameter: "Potência reativa",
    unit: "Var",
    controller: "PLC 1",
    address: "104",
    minLimit: -2500,
    maxLimit: 2500,
    scale: 100,
    rules: 1,
  },
  {
    parameter: "Fator de potência",
    unit: "FP",
    controller: "PLC 1",
    address: "105",
    minLimit: 0,
    maxLimit: 1,
    scale: 1000,
    rules: 0,
  },
];
