import { Module } from '@nestjs/common';
import { SupplierBankDetailsRepository } from './supplierBankDetails.repository';
import { SupplierBankDetailsService } from './supplierBankDetails.service';

@Module({
  imports: [],
  providers: [SupplierBankDetailsRepository, SupplierBankDetailsService],
  exports: [SupplierBankDetailsService]
})
export class SupplierBankDetailsModule {}
