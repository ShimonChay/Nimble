import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';
import { Invoice } from './entities/invoice.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async upsertMany(data: Partial<Invoice>[], transaction?: Transaction): Promise<void> {
    return this.invoiceRepository.upsertMany(data, transaction);
  }

  async getTotalsByStatus() {
    return this.invoiceRepository.getTotalsByStatus();
  }

  async getOverdueTrend(beginDate?: string, endDate?: string) {
    const { beginISO, endISO } = this.getValidatedDateRange(beginDate, endDate);
    return this.invoiceRepository.getOverdueTrend(beginISO, endISO);
  }

  async getMonthlyInvoiceTotals(beginDate?: string, endDate?: string) {
    const { beginISO, endISO } = this.getValidatedDateRange(beginDate, endDate);
    return this.invoiceRepository.getMonthlyInvoiceTotals(beginISO, endISO);
  }

  async getInvoicesBySupplier(supplierId: string) {
    return this.invoiceRepository.getInvoicesBySupplier(supplierId);
  }

  private getValidatedDateRange(beginDate?: string, endDate?: string): { beginISO: string; endISO: string } {
    const now = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(now.getFullYear() - 2);

    if (!beginDate && !endDate) {
      return {
        beginISO: twoYearsAgo.toISOString(),
        endISO: now.toISOString(),
      };
    }

    if (!beginDate) {
      const calculatedBeginDate = new Date(endDate!); 
      calculatedBeginDate.setFullYear(calculatedBeginDate.getFullYear() - 1);
      return {
        beginISO: calculatedBeginDate.toISOString(),
        endISO: new Date(endDate).toISOString(),
      };
    }

    if (!endDate) {
      const calculatedEndDate = new Date(beginDate); 
      calculatedEndDate.setFullYear(calculatedEndDate.getFullYear() + 1);
      return {
        beginISO: new Date(beginDate).toISOString(),
        endISO: calculatedEndDate.toISOString(),
      };
    }

    return {
      beginISO: new Date(beginDate).toISOString(),
      endISO: new Date(endDate).toISOString(),
    };
  }
}
