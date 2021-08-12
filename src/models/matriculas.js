'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class matriculas extends Model {
    static associate(models) {
      matriculas.belongsTo(models.pessoas, {
        foreignKey: 'estudante_id'
      })
      matriculas.belongsTo(models.turmas, {
        foreignKey: 'turma_id'
      })
    }
  };
  matriculas.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'matriculas'
  });
  return matriculas;
};