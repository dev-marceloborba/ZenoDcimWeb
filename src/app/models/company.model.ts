export interface CompanyRequest {
  companyName: string;
  tradingName: string;
  registrationNumber: string;
}

export interface CompanyResponse extends CompanyRequest {
  id: string;
}

export interface ContractRequest {
  companyId: string;
  startDate: Date;
  endDate: Date;
  powerConsumptionDailyLimit: number;
  intervalEndingNotification: number;
}

export interface ContractResponse extends ContractRequest {
  id: string;
}
