'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('turmas', [
      {
        docente_id: 2,
        nivel_id: 4,
        data_inicio: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        docente_id: 5,
        nivel_id: 5,
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
