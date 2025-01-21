import { Controller, Get, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('totals-by-status')
  async getTotalsByStatus() {
    return this.invoiceService.getTotalsByStatus();
  }

  
  @Get('overdue-trend')
  async getOverdueTrend() {
    return this.invoiceService.getOverdueTrend();
  }

  @Get('monthly-invoice-totals')
  async getMonthlyInvoiceTotals() {
    return this.invoiceService.getMonthlyInvoiceTotals();
  }

  @Get('by-supplier')
  async getInvoicesBySupplier(@Query('supplierId') supplierId: string) {
    if (!supplierId) {
      throw new Error('supplierId is required');
    }
    return this.invoiceService.getInvoicesBySupplier(supplierId);
  }
}
