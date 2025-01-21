'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Suppliers', {
      supplier_internal_id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      supplier_external_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplier_company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplier_address: {
        type: Sequelize.STRING,
      },
      supplier_country: {
        type: Sequelize.STRING,
      },
      supplier_contact_name: {
        type: Sequelize.STRING,
      },
      supplier_phone: {
        type: Sequelize.STRING,
      },
      supplier_email: {
        type: Sequelize.STRING,
      },
      supplier_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      supplier_stock_value: {
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable('Suppliers');
  },
};
