import { Controller, Get, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get('search')
  async getAllSuppliers(@Query('searchInput') searchInput: string) {
    return this.supplierService.getSuppliersDataBySearch(searchInput);
  }
}
