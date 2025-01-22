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
  async getOverdueTrend(@Query('filters') filters: {beginDate: string, endDate: string}) {
    console.log(filters)
    return this.invoiceService.getOverdueTrend(filters?.beginDate, filters?.endDate);
  }

  @Get('monthly-invoice-totals')
  async getMonthlyInvoiceTotals(@Query('filters') filters: {beginDate: string, endDate: string}) {
    return this.invoiceService.getMonthlyInvoiceTotals(filters?.beginDate, filters?.endDate);
  }

  @Get('by-supplier')
  async getInvoicesBySupplier(@Query('supplierId') supplierId: string) {
    if (!supplierId) {
      throw new Error('supplierId is required');
    }
    return this.invoiceService.getInvoicesBySupplier(supplierId);
  }
}
