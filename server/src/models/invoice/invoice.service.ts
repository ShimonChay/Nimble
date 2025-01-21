import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';
import { Invoice } from './entities/invoice.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) { }

  async upsertMany(data: Partial<Invoice>[],  transaction?: Transaction): Promise<void> {
    return this.invoiceRepository.upsertMany(data, transaction)
  }

  async getTotalsByStatus() {
    return this.invoiceRepository.getTotalsByStatus();
  }

  async getOverdueTrend() {
    return this.invoiceRepository.getOverdueTrend();
  }

  async getMonthlyInvoiceTotals() {
    return this.invoiceRepository.getMonthlyInvoiceTotals();
  }

  async getInvoicesBySupplier(supplierId: string) {
    return this.invoiceRepository.getInvoicesBySupplier(supplierId)
  }
}
