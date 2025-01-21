import { Injectable } from '@nestjs/common';
import { SupplierBankDetails } from './entities/supplierBankDetails.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class SupplierBankDetailsRepository {
  constructor() { }

  async upsertMany(data: Partial<SupplierBankDetails>[], transaction?: Transaction): Promise<void> {
    const fieldsToUpdate = Object.keys(SupplierBankDetails.getAttributes()).filter(
      (field) => !['supplier_internal_id', 'createdAt', 'updatedAt'].includes(field)
    ) as (keyof SupplierBankDetails)[];

    await SupplierBankDetails.bulkCreate(data, {
      updateOnDuplicate: fieldsToUpdate,
      transaction: transaction
    });
  }
}
