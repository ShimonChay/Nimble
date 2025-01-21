import { Injectable } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { Supplier } from './entities/supplier.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) { }

  async upsertMany(data: Partial<Supplier>[], transaction?: Transaction): Promise<void> {
    return this.supplierRepository.upsertMany(data, transaction)
  }

  async getSuppliersDataBySearch(searchInput: string): Promise<Supplier[]> {
    return await this.supplierRepository.getSuppliersDataBySearch(searchInput);
  }
}
