import { Module } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceService } from './invoice.service';
import { DatabaseModule } from 'src/postgres/provider.module';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [DatabaseModule],
  providers: [InvoiceRepository, InvoiceService],
  controllers: [InvoiceController],
  exports: [InvoiceService]
})
export class InvoiceModule {}
