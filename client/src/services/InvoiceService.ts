import axios from "axios";
import { BASE_URL, INVOICE_URL } from "../consts/axios";

const InvoiceService = {
  getTotalByStatus: async () => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/totals-by-status`))).data;
  }, 
  getOverdueTrend: async () => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/overdue-trend`))).data;
  }, 
  getMonthlyInvoiceTotals: async () => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/monthly-invoice-totals`))).data;
  }, 
  getInvoicesBySupplier: async (supplierId: string) => {
    return (await (axios.get(`${BASE_URL}${INVOICE_URL}/by-supplier`, {
      params: { supplierId}
    }))).data;
  }
}

export default InvoiceService;
