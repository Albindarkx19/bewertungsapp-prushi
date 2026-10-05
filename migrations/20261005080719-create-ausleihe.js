'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ausleihes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buchId: {
        allowNull: false,
        references: { model: 'Buches', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER
      },
      leserId: {
        allowNull: false,
        references: { model: 'Lesers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER
      },
      ausgeliehenAm: {
        allowNull: false,
        type: Sequelize.DATE
      },
      zurueckAm: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ausleihes');
  }
};