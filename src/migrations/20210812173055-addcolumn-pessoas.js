'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pessoas', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pessoas', 'deletedAt');
  }
};