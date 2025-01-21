import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  PrimaryKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';

import { Supplier } from 'src/models/supplier/entities/supplier.entity';

@Table({ tableName: 'Invoices', timestamps: true })

export class Invoice extends Model<Invoice> {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  public invoice_id: string;

  @ForeignKey(() => Supplier)
  @Column({ type: DataType.STRING, allowNull: false })
  public supplier_internal_id: string;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  public date: Date;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  public due_date: Date;

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL })
  public cost: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  public currency: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  public status: string;

  @BelongsTo(() => Supplier, 'supplier_internal_id')
  public supplier: Supplier;
}
