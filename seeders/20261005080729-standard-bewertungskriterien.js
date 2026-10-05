'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('Criteria', [
      { name: 'Fachliche Tiefe', maxScore: 10, weight: 1.00, createdAt: now, updatedAt: now },
      { name: 'Nachvollziehbarkeit', maxScore: 10, weight: 1.00, createdAt: now, updatedAt: now },
      { name: 'Präsentation', maxScore: 10, weight: 1.00, createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Criteria', {
      name: ['Fachliche Tiefe', 'Nachvollziehbarkeit', 'Präsentation']
    }, {});
  }
};
