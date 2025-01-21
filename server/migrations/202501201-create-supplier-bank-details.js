'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SupplierBankDetails', {
      supplier_internal_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'Suppliers',
          key: 'supplier_internal_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      supplier_bank_code: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      supplier_bank_branch_code: {
        type: Sequelize.STRING,
      },
      supplier_bank_account_number: {
        type: Sequelize.STRING,
      },
      supplier_withholding_tax: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SupplierBankDetails');
  },
};
