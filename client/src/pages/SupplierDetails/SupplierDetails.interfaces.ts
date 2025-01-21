export interface Supplier {
  supplier_address: string;
  supplier_city: string;
  supplier_company_name: string;
  supplier_contact_name: string;
  supplier_country: string;
  supplier_email: string;
  supplier_external_id: string;
  supplier_internal_id: string;
  supplier_phone: string;
  supplier_status: string;
  supplier_stock_value: string;
  supplier_withholding_tax: string;
}

export interface Invoice {
  cost: string;
  createdAt: string;
  currency: string;
  date: string;
  due_date: string;
  invoice_id: string;
  status: string;
  supplier_internal_id: string;
  updatedAt: string;
}
