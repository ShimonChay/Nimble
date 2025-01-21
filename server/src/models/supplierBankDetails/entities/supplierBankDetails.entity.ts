import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  PrimaryKey,
  AllowNull,
  BelongsTo,
  NotEmpty,
} from 'sequelize-typescript';

import { Supplier } from 'src/models/supplier/entities/supplier.entity';

@Table({ tableName: 'SupplierBankDetails', timestamps: true })
export class SupplierBankDetails extends Model<SupplierBankDetails> {

  @PrimaryKey
  @ForeignKey(() => Supplier)
  @Column({ type: DataType.STRING, allowNull: false })
  public supplier_internal_id: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  public bank_code: string;
  
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  public branch_code: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  public account_number: string;

  @BelongsTo(() => Supplier, 'supplier_internal_id')
  public supplier: Supplier;
}
