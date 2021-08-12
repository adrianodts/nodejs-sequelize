'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class turmas extends Model {
    static associate(models) {
      turmas.hasMany(models.matriculas, {
        foreignKey: 'turma_id'
      }),
      turmas.belongsTo(models.pessoas, {
        foreignKey: 'docente_id'
      }),
      turmas.belongsTo(models.niveis, {
        foreignKey: 'nivel_id'
      })
    }
  };
  turmas.init({
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'turmas'
  });
  return turmas;
};