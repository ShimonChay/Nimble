import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import { IProcessedData } from './csv.interfaces';
import { SupplierService } from '../supplier/supplier.service';
import { SupplierBankDetailsService } from '../supplierBankDetails/supplierBankDetails.service';
import { InvoiceService } from '../invoice/invoice.service';
import * as moment from 'moment';

@Injectable()
export class CsvService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly supplierService: SupplierService,
    private readonly supplierBankDetailsService: SupplierBankDetailsService,
    private readonly invoiceService: InvoiceService
  ) { }

  async processCSV(filePath: string): Promise<string> {
    const records: any[] = [];
    const processedData: IProcessedData = {
      suppliers: [],
      invoices: [],
      supplierBankDetails: [],
    };

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          records.push(row);
        })
        .on('end', async () => {
          try {
            const transaction = await this.sequelize.transaction();
            for (const record of records) {
              processedData.suppliers.push({
                supplier_internal_id: record.supplier_internal_id,
                supplier_external_id: record.supplier_external_id,
                supplier_company_name: record.supplier_company_name,
                supplier_address: record.supplier_address,
                supplier_city: record.supplier_city,
                supplier_country: record.supplier_country,
                supplier_contact_name: record.supplier_contact_name,
                supplier_phone: record.supplier_phone,
                supplier_email: record.supplier_email,
                supplier_status: record.supplier_status,
                supplier_stock_value: record.supplier_stock_value,
                supplier_withholding_tax: record.supplier_withholding_tax,
              });

              processedData.invoices.push({
                invoice_id: record.invoice_id,
                supplier_internal_id: record.supplier_internal_id,
                date: moment(record.invoice_date, 'DD/MM/YYYY').toDate(),
                due_date: moment(record.invoice_due_date, 'DD/MM/YYYY').toDate(),
                cost: record.invoice_cost,
                currency: record.invoice_currency,
                status: record.invoice_status,
              });

              processedData.supplierBankDetails.push({
                supplier_internal_id: record.supplier_internal_id,
                bank_code: record.supplier_bank_code,
                branch_code: record.supplier_bank_branch_code,
                account_number: record.supplier_bank_account_number,
              });

            }

            await this.supplierService.upsertMany(this.deduplicateByKey(processedData.suppliers, 'supplier_internal_id'), transaction)
            await this.supplierBankDetailsService.upsertMany(this.deduplicateByKey(processedData.supplierBankDetails, 'supplier_internal_id'), transaction)
            await this.invoiceService.upsertMany(processedData.invoices, transaction)

            await transaction.commit();

            fs.unlinkSync(filePath);
            resolve(`${records.length} records processed.`);
          } catch (error) {
            reject(
              new HttpException(
                `Error processing CSV: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
        })
        .on('error', (error) => {
          reject(
            new HttpException(
              `Error reading CSV: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        });
    });
  }

  deduplicateByKey<T>(array: T[], key: keyof T): T[] {
    const uniqueValues = new Set();
    return array.filter((element) => {
      if (uniqueValues.has(element[key])) {
        return false;
      }
      uniqueValues.add(element[key]);
      return true;
    });
  }  
}
