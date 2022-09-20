export interface SupplierModel {
  id: string;
  responsible: string;
  company: string;
  phone: string;
  email: string;
}

export interface CreateSupplierViewModel {
  responsible: string;
  company: string;
  phone: string;
  email: string;
}

export interface UpdateSupplierViewModel extends CreateSupplierViewModel {
  id: string;
}
