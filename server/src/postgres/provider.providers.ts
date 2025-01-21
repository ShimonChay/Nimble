import { Sequelize } from 'sequelize-typescript';
import { Invoice } from 'src/models/invoice/entities/invoice.entity';
import { Supplier } from 'src/models/supplier/entities/supplier.entity';
import { SupplierBankDetails } from 'src/models/supplierBankDetails/entities/supplierBankDetails.entity';

export const databaseProviders = [
  {
    provide: Sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize({
        database: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'test',
        dialect: 'postgres',
        models: [Invoice, Supplier, SupplierBankDetails],
      });

      sequelize.addModels([Invoice, Supplier, SupplierBankDetails]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
