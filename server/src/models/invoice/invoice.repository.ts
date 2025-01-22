import { Injectable } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { Transaction } from 'sequelize';
import { TotalsByStatus } from './invoice.interfaces';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class InvoiceRepository {
  constructor(private readonly sequelize: Sequelize) { }

  async upsertMany(data: Partial<Invoice>[], transaction?: Transaction): Promise<void> {
    const fieldsToUpdate = Object.keys(Invoice.getAttributes()).filter(
      (field) => !['invoiceId', 'createdAt', 'updatedAt'].includes(field)
    ) as (keyof Invoice)[];

    await Invoice.bulkCreate(data, {
      updateOnDuplicate: fieldsToUpdate,
      transaction: transaction
    });
  }

  async getTotalsByStatus(): Promise<{ status: string; total: number }[]> {
    const [results] = await this.sequelize.query(`
      SELECT status, COUNT(*) as total
      FROM "Invoices"
      GROUP BY status
    `);

    return results.map((row: TotalsByStatus) => ({
      status: row.status,
      total: parseInt(row.total, 10),
    }));
  }

  async getOverdueTrend(beginDate: string, endDate: string): Promise<{ month: Date; overdue_count: number }[]> {
    const [results] = await this.sequelize.query(
      `
      SELECT DATE_TRUNC('month', "due_date") AS month, COUNT(*) AS overdue_count
      FROM "Invoices"
      WHERE "due_date" BETWEEN :beginDate AND :endDate
        AND "due_date" < NOW()
        AND "status" != 'PAID'
        AND "status" != 'CANCELLED'
      GROUP BY month
      ORDER BY month
      `,
      {
        replacements: { beginDate: beginDate, endDate: endDate },
      }
    );
  
    return results.map((row: any) => ({
      month: new Date(row.month),
      overdue_count: parseInt(row.overdue_count, 10),
    }));
  }

  async getMonthlyInvoiceTotals(beginDate: string, endDate: string): Promise<{ month: Date; total: number }[]> {
    const [results] = await this.sequelize.query(
      `
      SELECT DATE_TRUNC('month', "date") AS month, COUNT(*) AS total
      FROM "Invoices"
      WHERE "date" BETWEEN :beginDate AND :endDate
      GROUP BY month
      ORDER BY month
      `,
      {
        replacements: { beginDate, endDate },
      }
    );
  
    return results.map((row: any) => ({
      month: new Date(row.month),
      total: parseFloat(row.total),
    }));
  }

  async getInvoicesBySupplier(supplierId: string): Promise<Invoice[]> {
    return await Invoice.findAll({
      where: {
        supplier_internal_id: supplierId,
      },
    });
  }
}
