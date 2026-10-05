'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('Autors', [
      { name: 'Marie Curie', geburtsjahr: 1867, createdAt: now, updatedAt: now },
      { name: 'Jules Verne', geburtsjahr: 1828, createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Autors', { name: ['Marie Curie', 'Jules Verne'] }, {});
  }
};
