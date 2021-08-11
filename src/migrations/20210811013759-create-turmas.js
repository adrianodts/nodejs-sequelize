'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turmas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      docente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'pessoas', key: 'id' }
      },
      nivel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'niveis', key: 'id' }
      },
      data_inicio: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('turmas');
  }
};