'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('turmas', [
      {
        docente_id: 1,
        nivel_id: 1,
        data_inicio: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        docente_id: 2,
        nivel_id: 2,
        data_inicio: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('turmas', null, {});
  }
};
