'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('Buches', {
      fields: ['autorId'],
      type: 'foreign key',
      name: 'buches_autor_id_fk',
      references: { table: 'Autors', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('Buches', 'buches_autor_id_fk');
  }
};