export interface CompanyViewModel {
  companyName: string;
  tradingName: string;
  registrationNumber: string;
}

export interface EditCompanyViewModel {
  id: string;
  companyName: string;
  tradingName: string;
  registrationNumber: string;
}

export interface CompanyModel extends CompanyViewModel {
  id: string;
}
