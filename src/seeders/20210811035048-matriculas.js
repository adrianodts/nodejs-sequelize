'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('matriculas', [
      {
        estudante_id: 1, 
        turma_id: 1,
        status: "Matriculado", 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estudante_id: 2, 
        turma_id: 2,
        status: "Aguardando", 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
