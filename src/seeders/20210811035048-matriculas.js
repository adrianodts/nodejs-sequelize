'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('matriculas', [
      {
        estudante_id: 1, 
        turma_id: 7,
        status: "Ativo", 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estudante_id: 4, 
        turma_id: 8,
        status: "Ativo", 
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
