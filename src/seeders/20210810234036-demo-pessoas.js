'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('pessoas', [
       {
        nome: 'John Doe',
        ativo: false,
        email: 'john@doe.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Adriano Dantas',
        ativo: true,
        email: 'adriano@dantas.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('pessoas', null, {});
  }
};
