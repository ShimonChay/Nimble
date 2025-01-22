import axios from "axios";
import { BASE_URL, INVOICE_URL } from "../consts/axios";

const InvoiceService = {
  getTotalByStatus: async () => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/totals-by-status`))).data;
  }, 
  getOverdueTrend: async (filters?: Record<string, any>) => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/overdue-trend`, { params: { filters }}))).data;
  }, 
  getMonthlyInvoiceTotals: async (filters?: Record<string, any>) => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/monthly-invoice-totals`, { params: { filters }}))).data;
  }, 
  getInvoicesBySupplier: async (supplierId: string) => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/by-supplier`, {
      params: { supplierId}
    }))).data;
  }
}

export default InvoiceService;
