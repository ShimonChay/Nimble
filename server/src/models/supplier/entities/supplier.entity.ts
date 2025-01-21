import {
  Table,
  Model,
  Column,
  HasMany,
  DataType,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

import { Invoice } from 'src/models/invoice/entities/invoice.entity';
import { SupplierBankDetails } from 'src/models/supplierBankDetails/entities/supplierBankDetails.entity';

@Table({ tableName: 'Suppliers', timestamps: true })
export class Supplier extends Model<Supplier> {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  public supplier_internal_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public supplier_external_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public supplier_company_name: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  public supplier_address: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  public supplier_city: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  public supplier_country: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  public supplier_contact_name: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  public supplier_phone: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  public supplier_email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'ACTIVE' })
  public supplier_status: string;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  public supplier_stock_value: number;

  @Column({ type: DataType.FLOAT(10, 2), defaultValue: 0 })
  public supplier_withholding_tax: number;

  @HasMany(() => SupplierBankDetails, 'supplier_internal_id')
  public bankDetails: SupplierBankDetails[];

  @HasMany(() => Invoice, 'supplier_internal_id')
  public invoices: Invoice[];
}
