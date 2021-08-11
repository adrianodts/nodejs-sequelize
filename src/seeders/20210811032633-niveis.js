'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('niveis', [
       {
        descr_nivel: "Basic",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descr_nivel: "Intermediate",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descr_nivel: "Advanced",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('niveis', null, {});
  }
};
