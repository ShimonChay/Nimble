import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { SupplierModule } from '../supplier/supplier.module';
import { SupplierBankDetailsModule } from '../supplierBankDetails/supplierBankDetails.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { DatabaseModule } from 'src/postgres/provider.module';

@Module({
  imports: [SupplierModule, SupplierBankDetailsModule, InvoiceModule, DatabaseModule],
  controllers: [CsvController],
  providers: [CsvService],
})
export class CsvModule { }
