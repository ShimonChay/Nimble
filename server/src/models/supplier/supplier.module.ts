import { Module } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { DatabaseModule } from 'src/postgres/provider.module';

@Module({
  imports: [DatabaseModule],
  providers: [SupplierRepository, SupplierService],
  controllers: [SupplierController],
  exports: [SupplierService]
})
export class SupplierModule {}
