export interface ContractViewModel {
  companyId: string;
  startDate: Date;
  endDate: Date;
  powerConsumptionDailyLimit: number;
  intervalEndingNotification: number;
}

export interface ContractModel extends ContractViewModel {
  id: string;
}
