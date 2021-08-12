'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pessoas extends Model {
    static associate(models) {
      pessoas.hasMany(models.turmas, {
        foreignKey: 'docente_id'
      })
      pessoas.hasMany(models.matriculas, {
        foreignKey: 'estudante_id'
      })
    }
  };
  pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'pessoas'
  });
  return pessoas;
};