import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './postgres/provider.module';
import { CsvModule } from './models/csvFile/csv.module';
import { SupplierModule } from './models/supplier/supplier.module';
import { SupplierBankDetailsModule } from './models/supplierBankDetails/supplierBankDetails.module';

@Module({
  imports: [DatabaseModule, CsvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
