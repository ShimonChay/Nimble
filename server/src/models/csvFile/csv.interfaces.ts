export interface ISupplier {
  supplier_internal_id: string;
  supplier_external_id: string;
  supplier_company_name: string;
  supplier_address: string;
  supplier_city: string;
  supplier_country: string;
  supplier_contact_name: string;
  supplier_phone: string;
  supplier_email: string;
  supplier_status: string;
  supplier_stock_value: number;
  supplier_withholding_tax: number;
}

export interface IInvoice {
  invoice_id: string;
  date: Date;
  due_date: Date;
  cost: number;
  currency: string;
  status: string;
  supplier_internal_id: string;
}

export interface ISupplierBankDetails {
  supplier_internal_id: string;
  bank_code: string;
  branch_code: string;
  account_number: string;
}

export interface IProcessedData {
  suppliers: ISupplier[];
  invoices: IInvoice[];
  supplierBankDetails: ISupplierBankDetails[];
}
