import { Injectable } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SupplierRepository {
  constructor(private readonly sequelize: Sequelize) { }

  async getSuppliersDataBySearch(searchInput: string): Promise<Supplier[]> {
    const searchCondition = searchInput
      ? `WHERE supplier.supplier_company_name ILIKE :searchInput`
      : '';

    const [results] = await this.sequelize.query(
      `
      SELECT supplier.*, COUNT(invoice.invoice_id) AS invoice_count
      FROM "Suppliers" as supplier
      LEFT JOIN "Invoices" as invoice ON supplier.supplier_internal_id = invoice.supplier_internal_id
      ${searchCondition}
      GROUP BY supplier.supplier_internal_id
      ORDER BY invoice_count DESC
      LIMIT 10;
    `,
      {
        replacements: searchInput ? { searchInput: `%${searchInput}%` } : undefined,
      }
    );

    return results as Supplier[];
  }

  async upsertMany(data: Partial<Supplier>[], transaction?: Transaction): Promise<void> {
    const fieldsToUpdate = Object.keys(Supplier.getAttributes()).filter(
      (field) => !['supplier_internal_id', 'createdAt', 'updatedAt'].includes(field)
    ) as (keyof Supplier)[];

    await Supplier.bulkCreate(data, {
      updateOnDuplicate: fieldsToUpdate,
      transaction: transaction
    });
  }
}
