'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      invoice_id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      invoice_date: {
        type: Sequelize.DATE,
      },
      invoice_due_date: {
        type: Sequelize.DATE,
      },
      invoice_cost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      invoice_currency: {
        type: Sequelize.STRING,
      },
      invoice_status: {
        type: Sequelize.STRING,
      },
      supplier_internal_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Suppliers',
          key: 'supplier_internal_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Invoices');
  },
};
