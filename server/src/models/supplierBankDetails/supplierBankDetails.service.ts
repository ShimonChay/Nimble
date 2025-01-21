import { Injectable } from '@nestjs/common';
import { SupplierBankDetailsRepository } from './supplierBankDetails.repository';
import { SupplierBankDetails } from './entities/supplierBankDetails.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class SupplierBankDetailsService {
  constructor(private readonly supplierBankDetails: SupplierBankDetailsRepository) { }

  async upsertMany(data: Partial<SupplierBankDetails>[],  transaction?: Transaction): Promise<void> {
    return this.supplierBankDetails.upsertMany(data, transaction)
  }
}
