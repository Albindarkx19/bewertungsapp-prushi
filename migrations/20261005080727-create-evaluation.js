'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        allowNull: false,
        references: { model: 'Projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER
      },
      criterionId: {
        allowNull: false,
        references: { model: 'Criteria', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER
      },
      jurorId: {
        allowNull: false,
        references: { model: 'Jurors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
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
    await queryInterface.addIndex('Evaluations', ['projectId', 'criterionId', 'jurorId'], {
      unique: true,
      name: 'evaluations_project_criterion_juror_unique'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Evaluations');
  }
};